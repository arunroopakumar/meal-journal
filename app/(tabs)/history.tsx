import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useMealContext } from '../../contexts/MealContext';
import NutritionBar from '../../components/NutritionBar';
import MealCard from '../../components/MealCard';
import { formatDate, formatDateDisplay, getToday } from '../../utils/dateUtils';
import { getNutritionHistory, getMealsForDate } from '../../services/database';
import { NutritionInfo } from '../../models/FoodItem';
import { Meal } from '../../models/Meal';
import { COLORS } from '../../utils/constants';

export default function HistoryScreen() {
  const { state } = useMealContext();
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [dayMeals, setDayMeals] = useState<Meal[]>([]);
  const [dayNutrition, setDayNutrition] = useState<NutritionInfo | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, { marked: boolean; dotColor: string }>>({});

  useEffect(() => {
    if (state.profile) {
      loadMonthData();
    }
  }, [state.profile]);

  useEffect(() => {
    if (state.profile) {
      loadDayData(selectedDate);
    }
  }, [selectedDate, state.profile]);

  async function loadMonthData() {
    if (!state.profile) return;
    const today = new Date();
    const startDate = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
    const endDate = formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));

    try {
      const history = await getNutritionHistory(state.profile.id, startDate, endDate);
      const marks: Record<string, { marked: boolean; dotColor: string }> = {};
      history.forEach((nutrition, date) => {
        const calPct = nutrition.calories / state.targetNutrition.calories;
        let dotColor = COLORS.success;
        if (calPct > 1.15 || calPct < 0.7) dotColor = COLORS.error;
        else if (calPct > 1.05 || calPct < 0.8) dotColor = COLORS.warning;
        marks[date] = { marked: true, dotColor };
      });
      setMarkedDates(marks);
    } catch (error) {
      console.error('Failed to load month data:', error);
    }
  }

  async function loadDayData(date: string) {
    if (!state.profile) return;
    try {
      const meals = await getMealsForDate(state.profile.id, date);
      setDayMeals(meals);
      if (meals.length > 0) {
        const total = meals.reduce(
          (acc, meal) => ({
            calories: acc.calories + meal.totalNutrition.calories,
            protein: acc.protein + meal.totalNutrition.protein,
            carbs: acc.carbs + meal.totalNutrition.carbs,
            fat: acc.fat + meal.totalNutrition.fat,
            fiber: acc.fiber + meal.totalNutrition.fiber,
            iron: acc.iron + meal.totalNutrition.iron,
            calcium: acc.calcium + meal.totalNutrition.calcium,
            vitaminC: acc.vitaminC + meal.totalNutrition.vitaminC,
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, iron: 0, calcium: 0, vitaminC: 0 }
        );
        setDayNutrition(total);
      } else {
        setDayNutrition(null);
      }
    } catch (error) {
      console.error('Failed to load day data:', error);
    }
  }

  const handleDayPress = useCallback((day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Calendar
        current={getToday()}
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...(markedDates[selectedDate] || {}),
            selected: true,
            selectedColor: COLORS.primary,
          },
        }}
        theme={{
          todayTextColor: COLORS.primary,
          arrowColor: COLORS.primary,
          textDayFontWeight: '400',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '500',
        }}
        style={styles.calendar}
      />

      <Text style={styles.selectedDateText}>{formatDateDisplay(selectedDate)}</Text>

      {dayNutrition ? (
        <>
          <View style={styles.nutritionCard}>
            <NutritionBar
              label="Calories"
              current={dayNutrition.calories}
              target={state.targetNutrition.calories}
              unit=" kcal"
              color={COLORS.calorieColor}
            />
            <NutritionBar
              label="Protein"
              current={dayNutrition.protein}
              target={state.targetNutrition.protein}
              unit="g"
              color={COLORS.proteinColor}
            />
            <NutritionBar
              label="Carbs"
              current={dayNutrition.carbs}
              target={state.targetNutrition.carbs}
              unit="g"
              color={COLORS.carbsColor}
            />
            <NutritionBar
              label="Fat"
              current={dayNutrition.fat}
              target={state.targetNutrition.fat}
              unit="g"
              color={COLORS.fatColor}
            />
            <NutritionBar
              label="Fiber"
              current={dayNutrition.fiber}
              target={state.targetNutrition.fiber}
              unit="g"
              color={COLORS.fiberColor}
            />
          </View>

          <Text style={styles.mealsTitle}>Meals</Text>
          {dayMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyText}>No meals logged for this day</Text>
        </View>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  calendar: {
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  nutritionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  mealsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
});
