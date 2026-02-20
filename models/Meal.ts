import { MealFoodItem, NutritionInfo } from './FoodItem';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
  id: string;
  userId: string;
  date: string;           // YYYY-MM-DD
  mealType: MealType;
  items: MealFoodItem[];
  totalNutrition: NutritionInfo;
  createdAt: string;
  updatedAt: string;
}

export interface DailyLog {
  date: string;           // YYYY-MM-DD
  meals: Meal[];
  totalNutrition: NutritionInfo;
  targetNutrition: NutritionInfo;
}

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snacks',
};

export const MEAL_TYPE_ICONS: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍪',
};

export const MEAL_TYPE_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export function aggregateNutrition(items: MealFoodItem[]): NutritionInfo {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.totalNutrition.calories,
      protein: Math.round((acc.protein + item.totalNutrition.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + item.totalNutrition.carbs) * 10) / 10,
      fat: Math.round((acc.fat + item.totalNutrition.fat) * 10) / 10,
      fiber: Math.round((acc.fiber + item.totalNutrition.fiber) * 10) / 10,
      iron: Math.round((acc.iron + item.totalNutrition.iron) * 10) / 10,
      calcium: acc.calcium + item.totalNutrition.calcium,
      vitaminC: Math.round((acc.vitaminC + item.totalNutrition.vitaminC) * 10) / 10,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, iron: 0, calcium: 0, vitaminC: 0 }
  );
}
