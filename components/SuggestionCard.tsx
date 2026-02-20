import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MealSuggestion } from '../services/suggestionEngine';
import { COLORS } from '../utils/constants';

interface SuggestionCardProps {
  suggestion: MealSuggestion;
}

export default function SuggestionCard({ suggestion }: SuggestionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bulb}>💡</Text>
        <Text style={styles.reason}>{suggestion.reason}</Text>
      </View>

      {suggestion.foods.map((sf, index) => (
        <View key={index} style={styles.foodRow}>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>
              {sf.food.name}
              {sf.servings > 1 ? ` (${sf.servings})` : ''}
            </Text>
            <Text style={styles.foodNutrition}>
              {sf.calories} kcal | P: {sf.protein}g
            </Text>
          </View>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>
          {suggestion.totalCalories} kcal | P: {suggestion.totalProtein}g | C: {suggestion.totalCarbs}g | F: {suggestion.totalFat}g
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulb: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 1,
  },
  reason: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  foodRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 4,
  },
  arrow: {
    fontSize: 14,
    color: COLORS.secondary,
    marginRight: 8,
    marginTop: 1,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  foodNutrition: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  totalRow: {
    flexDirection: 'row',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginRight: 6,
  },
  totalValue: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
});
