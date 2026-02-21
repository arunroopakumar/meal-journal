import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useMealContext } from '../../contexts/MealContext';
import NutritionBar from '../../components/NutritionBar';
import MealCard from '../../components/MealCard';
import SuggestionCard from '../../components/SuggestionCard';
import { MEAL_TYPE_ORDER, MEAL_TYPE_LABELS, MEAL_TYPE_ICONS, MealType } from '../../models/Meal';
import { formatDateDisplay, isToday } from '../../utils/dateUtils';
import { calculateProgress } from '../../utils/nutritionCalc';
import { COLORS } from '../../utils/constants';

export default function DashboardScreen() {
  const { state, deleteMeal, reloadToday } = useMealContext();
  const { meals, dailyNutrition, targetNutrition, suggestions, nutritionFlags, selectedDate, profile } = state;

  // Reload meals from DB every time this tab becomes visible
  useFocusEffect(
    useCallback(() => {
      reloadToday();
    }, [])
  );

  const calProgress = calculateProgress(targetNutrition.calories, dailyNutrition.calories);
  const loggedMealTypes = meals.map((m) => m.mealType);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Date Display */}
      <Text style={styles.dateText}>{formatDateDisplay(selectedDate)}</Text>

      {/* Calorie Summary */}
      <View style={styles.calorieCard}>
        <Text style={styles.calorieLabel}>Calories</Text>
        <Text style={styles.calorieValue}>
          {dailyNutrition.calories}{' '}
          <Text style={styles.calorieTarget}>/ {targetNutrition.calories} kcal</Text>
        </Text>
        <View style={styles.calorieBarBg}>
          <View
            style={[
              styles.calorieBarFill,
              {
                width: `${Math.min(100, calProgress)}%`,
                backgroundColor: calProgress > 100 ? COLORS.error : COLORS.primary,
              },
            ]}
          />
        </View>
        <Text style={styles.caloriePercent}>{calProgress}%</Text>
      </View>

      {/* Macro Summary */}
      <View style={styles.macroCard}>
        <Text style={styles.sectionTitle}>Macros Today</Text>
        <View style={styles.macroRow}>
          <NutritionBar
            label="Protein"
            current={dailyNutrition.protein}
            target={targetNutrition.protein}
            unit="g"
            color={COLORS.proteinColor}
            compact
          />
          <NutritionBar
            label="Carbs"
            current={dailyNutrition.carbs}
            target={targetNutrition.carbs}
            unit="g"
            color={COLORS.carbsColor}
            compact
          />
          <NutritionBar
            label="Fat"
            current={dailyNutrition.fat}
            target={targetNutrition.fat}
            unit="g"
            color={COLORS.fatColor}
            compact
          />
        </View>
      </View>

      {/* Today's Meals */}
      <Text style={styles.sectionTitle}>Today's Meals</Text>
      {MEAL_TYPE_ORDER.map((mealType) => {
        const meal = meals.find((m) => m.mealType === mealType);
        if (meal) {
          return (
            <MealCard
              key={mealType}
              meal={meal}
              onPress={() => router.push(`/meal/${meal.id}`)}
              onDelete={() => deleteMeal(meal.id)}
            />
          );
        }
        return (
          <TouchableOpacity
            key={mealType}
            style={styles.emptyMeal}
            onPress={() => router.push({ pathname: '/(tabs)/log', params: { mealType } })}
          >
            <Text style={styles.emptyMealIcon}>{MEAL_TYPE_ICONS[mealType]}</Text>
            <View style={styles.emptyMealInfo}>
              <Text style={styles.emptyMealLabel}>{MEAL_TYPE_LABELS[mealType]}</Text>
              <Text style={styles.emptyMealHint}>Not logged yet</Text>
            </View>
            <Text style={styles.emptyMealAdd}>+ Log</Text>
          </TouchableOpacity>
        );
      })}

      {/* Smart Suggestions */}
      {isToday(selectedDate) && suggestions.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Smart Suggestions</Text>
          {/* Nutrition flags */}
          {nutritionFlags.map((flag, idx) => (
            <View
              key={idx}
              style={[
                styles.flagCard,
                flag.type === 'warning' && styles.flagWarning,
                flag.type === 'success' && styles.flagSuccess,
                flag.type === 'info' && styles.flagInfo,
              ]}
            >
              <Text style={styles.flagText}>{flag.message}</Text>
            </View>
          ))}
          {/* Meal suggestions */}
          {suggestions.map((suggestion, idx) => (
            <SuggestionCard key={idx} suggestion={suggestion} />
          ))}
        </>
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
  dateText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  // Calorie card
  calorieCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  calorieLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  calorieValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginVertical: 4,
  },
  calorieTarget: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  calorieBarBg: {
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 8,
  },
  calorieBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  caloriePercent: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
  // Macro card
  macroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  macroRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  // Empty meal
  emptyMeal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  emptyMealIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  emptyMealInfo: {
    flex: 1,
  },
  emptyMealLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  emptyMealHint: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  emptyMealAdd: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  // Flags
  flagCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
  },
  flagWarning: {
    backgroundColor: '#FFF3E0',
    borderLeftColor: COLORS.warning,
  },
  flagSuccess: {
    backgroundColor: '#E8F5E9',
    borderLeftColor: COLORS.success,
  },
  flagInfo: {
    backgroundColor: '#E3F2FD',
    borderLeftColor: COLORS.accent,
  },
  flagText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
});
