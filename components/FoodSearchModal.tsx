import React, { useState, useMemo, useCallback } from 'react';
import {
  View, Text, StyleSheet, TextInput, FlatList,
  TouchableOpacity, Modal, SafeAreaView, Alert,
} from 'react-native';
import { FoodItem, NutritionInfo, calculateNutrition, MealFoodItem } from '../models/FoodItem';
import { FoodCategory } from '../models/FoodItem';
import { searchFoods, getFoodsByCategory, INDIAN_FOODS } from '../data/indianFoods';
import { useMealContext } from '../contexts/MealContext';
import { generateId } from '../utils/dateUtils';
import { COLORS } from '../utils/constants';

interface FoodSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onAddItem: (item: MealFoodItem) => void;
}

const CATEGORIES: { key: FoodCategory; label: string }[] = [
  { key: 'south-indian', label: 'South Indian' },
  { key: 'north-indian', label: 'North Indian' },
  { key: 'dal-legumes', label: 'Dal & Legumes' },
  { key: 'rice-dishes', label: 'Rice Dishes' },
  { key: 'bread-roti', label: 'Bread & Roti' },
  { key: 'curries', label: 'Curries' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'beverages', label: 'Beverages' },
  { key: 'fruits', label: 'Fruits' },
  { key: 'non-veg', label: 'Non-Veg' },
  { key: 'eggs', label: 'Eggs' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'sweets', label: 'Sweets' },
];

export default function FoodSearchModal({ visible, onClose, onAddItem }: FoodSearchModalProps) {
  const { state } = useMealContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servings, setServings] = useState('1');

  const dietPref = state.profile?.dietaryPreference;

  const filteredFoods = useMemo(() => {
    if (searchQuery.length >= 2) {
      return searchFoods(searchQuery, dietPref);
    }
    if (selectedCategory) {
      return getFoodsByCategory(selectedCategory, dietPref);
    }
    return [];
  }, [searchQuery, selectedCategory, dietPref]);

  const handleSelectFood = useCallback((food: FoodItem) => {
    setSelectedFood(food);
    setServings('1');
  }, []);

  const handleAddFood = useCallback(() => {
    if (!selectedFood) return;
    const numServings = parseFloat(servings) || 1;
    const nutrition = calculateNutrition(selectedFood, numServings);
    const item: MealFoodItem = {
      id: generateId(),
      foodItem: selectedFood,
      servings: numServings,
      totalNutrition: nutrition,
    };
    onAddItem(item);
    setSelectedFood(null);
    setSearchQuery('');
    setSelectedCategory(null);
  }, [selectedFood, servings, onAddItem]);

  const handleClose = useCallback(() => {
    setSelectedFood(null);
    setSearchQuery('');
    setSelectedCategory(null);
    onClose();
  }, [onClose]);

  // Food detail view
  if (selectedFood) {
    const numServings = parseFloat(servings) || 1;
    const nutrition = calculateNutrition(selectedFood, numServings);

    return (
      <Modal visible={visible} animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSelectedFood(null)}>
              <Text style={styles.backBtn}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{selectedFood.name}</Text>
            <View style={{ width: 50 }} />
          </View>

          {selectedFood.hindiName && (
            <Text style={styles.hindiName}>{selectedFood.hindiName}</Text>
          )}

          <View style={styles.servingRow}>
            <Text style={styles.servingLabel}>Servings:</Text>
            <TouchableOpacity
              style={styles.servingBtn}
              onPress={() => setServings(String(Math.max(0.5, numServings - 0.5)))}
            >
              <Text style={styles.servingBtnText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.servingInput}
              value={servings}
              onChangeText={setServings}
              keyboardType="decimal-pad"
              textAlign="center"
            />
            <TouchableOpacity
              style={styles.servingBtn}
              onPress={() => setServings(String(numServings + 0.5))}
            >
              <Text style={styles.servingBtnText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.servingUnit}>{selectedFood.servingUnit}(s)</Text>
          </View>

          <Text style={styles.servingInfo}>
            {Math.round(selectedFood.servingSize * numServings)}g total
          </Text>

          <View style={styles.nutritionCard}>
            <Text style={styles.nutritionTitle}>
              Nutrition ({numServings} {selectedFood.servingUnit}{numServings !== 1 ? 's' : ''})
            </Text>
            <NutritionRow label="Calories" value={`${nutrition.calories} kcal`} bold />
            <NutritionRow label="Protein" value={`${nutrition.protein}g`} />
            <NutritionRow label="Carbs" value={`${nutrition.carbs}g`} />
            <NutritionRow label="Fat" value={`${nutrition.fat}g`} />
            <NutritionRow label="Fiber" value={`${nutrition.fiber}g`} />
            <NutritionRow label="Iron" value={`${nutrition.iron}mg`} />
            <NutritionRow label="Calcium" value={`${nutrition.calcium}mg`} />
            <NutritionRow label="Vitamin C" value={`${nutrition.vitaminC}mg`} />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
            <Text style={styles.addButtonText}>+ Add to Meal</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  }

  // Search/browse view
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search Food</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeBtn}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search food (e.g. idli, dal, roti)..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setSelectedCategory(null);
            }}
            autoFocus
          />
        </View>

        {searchQuery.length < 2 && !selectedCategory && (
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={styles.categoryChip}
                  onPress={() => {
                    setSelectedCategory(cat.key);
                    setSearchQuery('');
                  }}
                >
                  <Text style={styles.categoryChipText}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.foodListItem}
              onPress={() => handleSelectFood(item)}
            >
              <View style={styles.foodListInfo}>
                <Text style={styles.foodListName}>{item.name}</Text>
                <Text style={styles.foodListServing}>
                  1 {item.servingUnit} ({item.servingSize}g)
                </Text>
              </View>
              <View style={styles.foodListCals}>
                <Text style={styles.foodListCalText}>
                  {Math.round(item.nutritionPer100g.calories * item.servingSize / 100)} kcal
                </Text>
                {item.isVegetarian && <Text style={styles.vegBadge}>VEG</Text>}
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            searchQuery.length >= 2 ? (
              <Text style={styles.emptyText}>No foods found for "{searchQuery}"</Text>
            ) : null
          }
          style={styles.foodList}
        />
      </SafeAreaView>
    </Modal>
  );
}

function NutritionRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.nutritionRow}>
      <Text style={[styles.nutritionLabel, bold && styles.boldText]}>{label}</Text>
      <Text style={[styles.nutritionValue, bold && styles.boldText]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  closeBtn: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '500',
  },
  backBtn: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '500',
  },
  hindiName: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  categoryChipText: {
    fontSize: 13,
    color: COLORS.primaryDark,
    fontWeight: '500',
  },
  foodList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  foodListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  foodListInfo: {
    flex: 1,
  },
  foodListName: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  foodListServing: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  foodListCals: {
    alignItems: 'flex-end',
  },
  foodListCalText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.calorieColor,
  },
  vegBadge: {
    fontSize: 9,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 2,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: 40,
    fontSize: 14,
  },
  // Detail view
  servingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  servingLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  servingBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  servingBtnText: {
    fontSize: 20,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  servingInput: {
    width: 60,
    height: 36,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  servingUnit: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  servingInfo: {
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  nutritionCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  nutritionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  nutritionLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  nutritionValue: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  boldText: {
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
