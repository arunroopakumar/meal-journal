import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MealType, MEAL_TYPE_LABELS, MEAL_TYPE_ICONS, MEAL_TYPE_ORDER } from '../../models/Meal';
import { MealFoodItem, aggregateNutrition } from '../../models';
import FoodSearchModal from '../../components/FoodSearchModal';
import { useMealContext } from '../../contexts/MealContext';
import { COLORS } from '../../utils/constants';

export default function LogMealScreen() {
  const params = useLocalSearchParams<{ mealType?: string }>();
  const { logMeal } = useMealContext();

  const [selectedMealType, setSelectedMealType] = useState<MealType>(
    (params.mealType as MealType) || 'breakfast'
  );
  const [items, setItems] = useState<MealFoodItem[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const totalNutrition = items.length > 0 ? aggregateNutrition(items) : null;

  const handleAddItem = useCallback((item: MealFoodItem) => {
    setItems((prev) => [...prev, item]);
    setShowSearch(false);
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  async function handleLogMeal() {
    if (items.length === 0) {
      Alert.alert('No items', 'Please add at least one food item to log.');
      return;
    }
    setIsSaving(true);
    try {
      await logMeal(selectedMealType, items);
      Alert.alert(
        'Meal Logged!',
        `${MEAL_TYPE_LABELS[selectedMealType]} has been logged successfully.`,
        [{ text: 'OK', onPress: () => { setItems([]); router.navigate('/(tabs)'); } }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to log meal. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Meal Type Selection */}
        <Text style={styles.sectionTitle}>Meal Type</Text>
        <View style={styles.mealTypeRow}>
          {MEAL_TYPE_ORDER.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.mealTypeBtn, selectedMealType === type && styles.mealTypeBtnSelected]}
              onPress={() => setSelectedMealType(type)}
            >
              <Text style={styles.mealTypeIcon}>{MEAL_TYPE_ICONS[type]}</Text>
              <Text
                style={[
                  styles.mealTypeText,
                  selectedMealType === type && styles.mealTypeTextSelected,
                ]}
              >
                {MEAL_TYPE_LABELS[type]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Added Items */}
        {items.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Added Items</Text>
            {items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>
                    {item.foodItem.name}
                    {item.servings > 1 ? ` (x${item.servings})` : ''}
                  </Text>
                  <Text style={styles.itemNutrition}>
                    {item.totalNutrition.calories} kcal | P: {item.totalNutrition.protein}g | C: {item.totalNutrition.carbs}g | F: {item.totalNutrition.fat}g
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                  <Text style={styles.removeBtn}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Total */}
            {totalNutrition && (
              <View style={styles.totalCard}>
                <Text style={styles.totalTitle}>Meal Total</Text>
                <Text style={styles.totalCalories}>{totalNutrition.calories} kcal</Text>
                <Text style={styles.totalMacros}>
                  P: {totalNutrition.protein}g | C: {totalNutrition.carbs}g | F: {totalNutrition.fat}g
                </Text>
              </View>
            )}
          </>
        )}

        {/* Add Food Button */}
        <TouchableOpacity
          style={styles.addFoodBtn}
          onPress={() => setShowSearch(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.addFoodIcon}>🔍</Text>
          <Text style={styles.addFoodText}>Search & Add Food</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Action */}
      {items.length > 0 && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.logButton, isSaving && styles.logButtonDisabled]}
            onPress={handleLogMeal}
            disabled={isSaving}
            activeOpacity={0.8}
          >
            <Text style={styles.logButtonText}>
              {isSaving ? 'Saving...' : `Log ${MEAL_TYPE_LABELS[selectedMealType]}`}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Food Search Modal */}
      <FoodSearchModal
        visible={showSearch}
        onClose={() => setShowSearch(false)}
        onAddItem={handleAddItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  // Meal type selection
  mealTypeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  mealTypeBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  mealTypeBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  mealTypeIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  mealTypeText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  mealTypeTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  // Item cards
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  itemNutrition: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  removeBtn: {
    fontSize: 18,
    color: COLORS.error,
    paddingHorizontal: 8,
  },
  // Total
  totalCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 12,
  },
  totalTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalCalories: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginVertical: 4,
  },
  totalMacros: {
    fontSize: 13,
    color: COLORS.primaryDark,
  },
  // Add food button
  addFoodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    marginTop: 8,
  },
  addFoodIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  addFoodText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  logButtonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  logButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
