import { NutritionInfo } from '../models/FoodItem';
import {
  UserProfile,
  Gender,
  ActivityLevel,
  GoalType,
  ACTIVITY_LEVEL_MULTIPLIERS,
} from '../models/UserProfile';
import {
  CALORIES_PER_GRAM,
  GOAL_CALORIE_ADJUSTMENT,
  MACRO_RATIOS,
  MEAL_CALORIE_DISTRIBUTION,
} from './constants';
import { MealType } from '../models/Meal';

/**
 * Calculate BMR using Mifflin-St Jeor equation
 * Most accurate for Indian population
 */
export function calculateBMR(gender: Gender, weight: number, height: number, age: number): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_LEVEL_MULTIPLIERS[activityLevel]);
}

/**
 * Calculate daily calorie target based on profile and goal
 */
export function calculateCalorieTarget(
  gender: Gender,
  weight: number,
  height: number,
  age: number,
  activityLevel: ActivityLevel,
  goal: GoalType
): number {
  const bmr = calculateBMR(gender, weight, height, age);
  const tdee = calculateTDEE(bmr, activityLevel);
  return Math.max(1200, tdee + GOAL_CALORIE_ADJUSTMENT[goal]);
}

/**
 * Calculate macro targets based on calorie target and goal
 */
export function calculateMacroTargets(
  calorieTarget: number,
  goal: GoalType,
  weight: number
): { protein: number; carbs: number; fat: number; fiber: number } {
  const ratios = MACRO_RATIOS[goal];
  return {
    protein: Math.round((calorieTarget * ratios.protein) / CALORIES_PER_GRAM.protein),
    carbs: Math.round((calorieTarget * ratios.carbs) / CALORIES_PER_GRAM.carbs),
    fat: Math.round((calorieTarget * ratios.fat) / CALORIES_PER_GRAM.fat),
    fiber: 30, // Fixed recommendation for most adults
  };
}

/**
 * Calculate complete nutrition targets for a user profile
 */
export function calculateNutritionTargets(profile: Partial<UserProfile>): NutritionInfo {
  const { gender = 'male', weight = 70, height = 170, age = 30, activityLevel = 'sedentary', goal = 'maintain' } = profile;

  const calories = calculateCalorieTarget(gender, weight, height, age, activityLevel, goal);
  const macros = calculateMacroTargets(calories, goal, weight);

  return {
    calories,
    protein: macros.protein,
    carbs: macros.carbs,
    fat: macros.fat,
    fiber: macros.fiber,
    iron: gender === 'female' ? 21 : 17,
    calcium: 600,
    vitaminC: 40,
  };
}

/**
 * Calculate remaining nutrition budget for the day
 */
export function calculateRemainingBudget(
  target: NutritionInfo,
  consumed: NutritionInfo
): NutritionInfo {
  return {
    calories: Math.max(0, target.calories - consumed.calories),
    protein: Math.max(0, Math.round((target.protein - consumed.protein) * 10) / 10),
    carbs: Math.max(0, Math.round((target.carbs - consumed.carbs) * 10) / 10),
    fat: Math.max(0, Math.round((target.fat - consumed.fat) * 10) / 10),
    fiber: Math.max(0, Math.round((target.fiber - consumed.fiber) * 10) / 10),
    iron: Math.max(0, Math.round((target.iron - consumed.iron) * 10) / 10),
    calcium: Math.max(0, target.calcium - consumed.calcium),
    vitaminC: Math.max(0, Math.round((target.vitaminC - consumed.vitaminC) * 10) / 10),
  };
}

/**
 * Calculate what percentage of daily target has been consumed
 */
export function calculateProgress(target: number, consumed: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((consumed / target) * 100));
}

/**
 * Get the suggested calorie range for a specific meal
 */
export function getSuggestedMealCalories(
  dailyTarget: number,
  mealType: MealType,
  consumed: number
): { min: number; max: number } {
  const remaining = dailyTarget - consumed;
  const idealRatio = MEAL_CALORIE_DISTRIBUTION[mealType];
  const ideal = Math.round(dailyTarget * idealRatio);

  return {
    min: Math.max(200, Math.round(ideal * 0.7)),
    max: Math.min(remaining, Math.round(ideal * 1.3)),
  };
}

/**
 * Identify nutritional flags/issues for the day so far
 */
export interface NutritionFlag {
  type: 'warning' | 'info' | 'success';
  nutrient: keyof NutritionInfo;
  message: string;
}

export function analyzeNutritionFlags(
  target: NutritionInfo,
  consumed: NutritionInfo,
  mealsLogged: number
): NutritionFlag[] {
  const flags: NutritionFlag[] = [];
  const calorieProgress = calculateProgress(target.calories, consumed.calories);
  const proteinProgress = calculateProgress(target.protein, consumed.protein);
  const carbsProgress = calculateProgress(target.carbs, consumed.carbs);
  const fatProgress = calculateProgress(target.fat, consumed.fat);

  // After at least one meal, check imbalances
  if (mealsLogged >= 1) {
    const expectedProgress = mealsLogged * 30; // rough: each meal ~30% of daily

    if (calorieProgress > expectedProgress + 15) {
      flags.push({
        type: 'warning',
        nutrient: 'calories',
        message: `You've consumed ${calorieProgress}% of daily calories in ${mealsLogged} meal${mealsLogged > 1 ? 's' : ''}. Consider lighter options for remaining meals.`,
      });
    }

    if (proteinProgress < calorieProgress - 20) {
      flags.push({
        type: 'warning',
        nutrient: 'protein',
        message: `Protein intake is low (${proteinProgress}%) compared to calories (${calorieProgress}%). Add protein-rich foods.`,
      });
    }

    if (fatProgress > expectedProgress + 20) {
      flags.push({
        type: 'warning',
        nutrient: 'fat',
        message: `Fat intake is high (${fatProgress}% of daily target). Go for low-fat options next.`,
      });
    }

    if (carbsProgress > expectedProgress + 20) {
      flags.push({
        type: 'info',
        nutrient: 'carbs',
        message: `Carb intake is on the higher side. Balance with protein and fiber-rich foods.`,
      });
    }

    // Positive feedback
    if (
      Math.abs(calorieProgress - expectedProgress) <= 10 &&
      Math.abs(proteinProgress - calorieProgress) <= 10
    ) {
      flags.push({
        type: 'success',
        nutrient: 'calories',
        message: 'Great balance so far! Keep it up.',
      });
    }
  }

  return flags;
}
