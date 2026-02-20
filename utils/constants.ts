import { NutritionInfo } from '../models/FoodItem';

// Recommended Daily Allowance (RDA) baselines for Indian adults
// Based on ICMR-NIN guidelines
export const RDA_DEFAULTS: NutritionInfo = {
  calories: 2000,
  protein: 55,      // grams (0.8g per kg for 70kg person)
  carbs: 275,       // grams (55% of 2000 kcal)
  fat: 65,          // grams (30% of 2000 kcal)
  fiber: 30,        // grams
  iron: 17,         // mg (higher for Indian diet due to plant-based iron)
  calcium: 600,     // mg
  vitaminC: 40,     // mg
};

// Macro calorie multipliers
export const CALORIES_PER_GRAM = {
  protein: 4,
  carbs: 4,
  fat: 9,
  fiber: 2,
};

// Goal-based calorie adjustments
export const GOAL_CALORIE_ADJUSTMENT = {
  maintain: 0,
  lose: -500,      // 500 kcal deficit for ~0.5kg/week loss
  gain: 400,       // 400 kcal surplus for lean gain
};

// Macro split ratios (% of total calories)
export const MACRO_RATIOS = {
  maintain: { protein: 0.20, carbs: 0.55, fat: 0.25 },
  lose:     { protein: 0.30, carbs: 0.45, fat: 0.25 },
  gain:     { protein: 0.25, carbs: 0.50, fat: 0.25 },
};

// Minimum nutrition thresholds (below this triggers a warning)
export const MIN_THRESHOLDS = {
  protein: 0.8,    // g per kg body weight
  fiber: 25,       // grams
  iron: 10,        // mg
  calcium: 400,    // mg
};

// Colors for the app
export const COLORS = {
  primary: '#4CAF50',        // Green - healthy, fresh
  primaryDark: '#388E3C',
  primaryLight: '#C8E6C9',
  secondary: '#FF9800',      // Orange - energy, warmth
  secondaryDark: '#F57C00',
  accent: '#2196F3',         // Blue - trust
  background: '#FAFAFA',
  surface: '#FFFFFF',
  textPrimary: '#212121',
  textSecondary: '#757575',
  textLight: '#BDBDBD',
  border: '#E0E0E0',
  error: '#F44336',
  warning: '#FFC107',
  success: '#4CAF50',
  calorieColor: '#FF5722',
  proteinColor: '#2196F3',
  carbsColor: '#FF9800',
  fatColor: '#9C27B0',
  fiberColor: '#4CAF50',
};

// Meal type suggested calorie distribution
export const MEAL_CALORIE_DISTRIBUTION = {
  breakfast: 0.25,   // 25% of daily calories
  lunch: 0.35,       // 35%
  dinner: 0.30,      // 30%
  snack: 0.10,       // 10%
};

// App text constants
export const APP_NAME = 'Meal Journal';
export const APP_TAGLINE = 'Track your meals, balance your nutrition';
