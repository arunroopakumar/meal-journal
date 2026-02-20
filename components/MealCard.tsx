import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Meal, MEAL_TYPE_LABELS, MEAL_TYPE_ICONS } from '../models/Meal';
import { COLORS } from '../utils/constants';

interface MealCardProps {
  meal: Meal;
  onPress?: () => void;
  onDelete?: () => void;
}

export default function MealCard({ meal, onPress, onDelete }: MealCardProps) {
  const icon = MEAL_TYPE_ICONS[meal.mealType];
  const label = MEAL_TYPE_LABELS[meal.mealType];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{label}</Text>
        </View>
        <Text style={styles.calories}>{meal.totalNutrition.calories} kcal</Text>
      </View>

      <Text style={styles.items} numberOfLines={2}>
        {meal.items.map((item) => {
          const name = item.foodItem.name;
          return item.servings > 1 ? `${name} (${item.servings})` : name;
        }).join(', ')}
      </Text>

      <View style={styles.macroRow}>
        <MacroPill label="P" value={meal.totalNutrition.protein} color={COLORS.proteinColor} />
        <MacroPill label="C" value={meal.totalNutrition.carbs} color={COLORS.carbsColor} />
        <MacroPill label="F" value={meal.totalNutrition.fat} color={COLORS.fatColor} />
      </View>

      {onDelete && (
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.deleteText}>Remove</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

function MacroPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={[styles.pill, { backgroundColor: color + '20' }]}>
      <Text style={[styles.pillText, { color }]}>
        {label}: {Math.round(value)}g
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  calories: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.calorieColor,
  },
  items: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  deleteText: {
    fontSize: 13,
    color: COLORS.error,
  },
});
