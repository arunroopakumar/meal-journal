export interface NutritionInfo {
  calories: number;       // kcal
  protein: number;        // grams
  carbs: number;          // grams
  fat: number;            // grams
  fiber: number;          // grams
  iron: number;           // mg
  calcium: number;        // mg
  vitaminC: number;       // mg
}

export interface FoodItem {
  id: string;
  name: string;
  hindiName?: string;
  category: FoodCategory;
  region?: IndianRegion;
  servingSize: number;    // grams
  servingUnit: string;    // e.g. "piece", "bowl", "cup", "roti"
  nutritionPer100g: NutritionInfo;
  isVegetarian: boolean;
  isVegan: boolean;
  tags: string[];         // e.g. ["breakfast", "south-indian", "high-protein"]
}

export type FoodCategory =
  | 'south-indian'
  | 'north-indian'
  | 'bengali'
  | 'gujarati'
  | 'maharashtrian'
  | 'kerala'
  | 'rajasthani'
  | 'punjabi'
  | 'street-food'
  | 'snacks'
  | 'beverages'
  | 'fruits'
  | 'vegetables'
  | 'dal-legumes'
  | 'rice-dishes'
  | 'bread-roti'
  | 'curries'
  | 'sweets'
  | 'non-veg'
  | 'eggs'
  | 'dairy'
  | 'other';

export type IndianRegion =
  | 'pan-indian'
  | 'south'
  | 'north'
  | 'east'
  | 'west'
  | 'northeast';

export interface MealFoodItem {
  id: string;
  foodItem: FoodItem;
  servings: number;
  totalNutrition: NutritionInfo;
}

export function calculateNutrition(food: FoodItem, servings: number): NutritionInfo {
  const totalGrams = food.servingSize * servings;
  const factor = totalGrams / 100;
  const n = food.nutritionPer100g;
  return {
    calories: Math.round(n.calories * factor),
    protein: Math.round(n.protein * factor * 10) / 10,
    carbs: Math.round(n.carbs * factor * 10) / 10,
    fat: Math.round(n.fat * factor * 10) / 10,
    fiber: Math.round(n.fiber * factor * 10) / 10,
    iron: Math.round(n.iron * factor * 10) / 10,
    calcium: Math.round(n.calcium * factor),
    vitaminC: Math.round(n.vitaminC * factor * 10) / 10,
  };
}
