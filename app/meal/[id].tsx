import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useMealContext } from '../../contexts/MealContext';
import { MEAL_TYPE_LABELS, MEAL_TYPE_ICONS } from '../../models/Meal';
import NutritionBar from '../../components/NutritionBar';
import { COLORS } from '../../utils/constants';

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, deleteMeal } = useMealContext();

  const meal = state.meals.find((m) => m.id === id);

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Meal not found</Text>
      </View>
    );
  }

  function handleDelete() {
    Alert.alert(
      'Delete Meal',
      `Are you sure you want to delete this ${MEAL_TYPE_LABELS[meal!.mealType]}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteMeal(meal!.id);
            router.back();
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.icon}>{MEAL_TYPE_ICONS[meal.mealType]}</Text>
        <Text style={styles.title}>{MEAL_TYPE_LABELS[meal.mealType]}</Text>
        <Text style={styles.calories}>{meal.totalNutrition.calories} kcal</Text>
      </View>

      {/* Nutrition Summary */}
      <View style={styles.nutritionCard}>
        <Text style={styles.sectionTitle}>Nutrition</Text>
        <NutritionBar
          label="Protein"
          current={meal.totalNutrition.protein}
          target={state.targetNutrition.protein}
          unit="g"
          color={COLORS.proteinColor}
        />
        <NutritionBar
          label="Carbs"
          current={meal.totalNutrition.carbs}
          target={state.targetNutrition.carbs}
          unit="g"
          color={COLORS.carbsColor}
        />
        <NutritionBar
          label="Fat"
          current={meal.totalNutrition.fat}
          target={state.targetNutrition.fat}
          unit="g"
          color={COLORS.fatColor}
        />
        <NutritionBar
          label="Fiber"
          current={meal.totalNutrition.fiber}
          target={state.targetNutrition.fiber}
          unit="g"
          color={COLORS.fiberColor}
        />
      </View>

      {/* Items */}
      <Text style={styles.sectionTitle}>Items</Text>
      {meal.items.map((item) => (
        <View key={item.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{item.foodItem.name}</Text>
            <Text style={styles.itemCalories}>{item.totalNutrition.calories} kcal</Text>
          </View>
          <Text style={styles.itemServings}>
            {item.servings} {item.foodItem.servingUnit}{item.servings > 1 ? 's' : ''} ({Math.round(item.foodItem.servingSize * item.servings)}g)
          </Text>
          <Text style={styles.itemMacros}>
            P: {item.totalNutrition.protein}g | C: {item.totalNutrition.carbs}g | F: {item.totalNutrition.fat}g
          </Text>
        </View>
      ))}

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Meal</Text>
      </TouchableOpacity>

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
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  calories: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.calorieColor,
    marginTop: 4,
  },
  nutritionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  itemCalories: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.calorieColor,
  },
  itemServings: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  itemMacros: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.error,
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.error,
  },
});
