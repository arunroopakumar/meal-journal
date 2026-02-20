import { FoodItem, NutritionInfo } from '../models/FoodItem';
import { MealType, MEAL_TYPE_ORDER } from '../models/Meal';
import { DietaryPreference } from '../models/UserProfile';
import { INDIAN_FOODS, getFoodsByCategory } from '../data/indianFoods';
import {
  calculateRemainingBudget,
  analyzeNutritionFlags,
  NutritionFlag,
} from '../utils/nutritionCalc';
import { MEAL_CALORIE_DISTRIBUTION } from '../utils/constants';

export interface MealSuggestion {
  foods: SuggestedFood[];
  reason: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface SuggestedFood {
  food: FoodItem;
  servings: number;
  calories: number;
  protein: number;
}

/**
 * Generate smart meal suggestions based on what's been consumed today
 */
export function generateSuggestions(
  target: NutritionInfo,
  consumed: NutritionInfo,
  mealsLogged: MealType[],
  dietaryPref: DietaryPreference,
  nextMealType?: MealType
): { suggestions: MealSuggestion[]; flags: NutritionFlag[] } {
  const flags = analyzeNutritionFlags(target, consumed, mealsLogged.length);
  const remaining = calculateRemainingBudget(target, consumed);
  const nextMeal = nextMealType || getNextMealType(mealsLogged);

  if (!nextMeal) {
    return { suggestions: [], flags };
  }

  const remainingMeals = getRemainingMeals(mealsLogged);
  const mealBudget = calculateMealBudget(remaining, nextMeal, remainingMeals.length);

  // Determine what nutritional focus is needed
  const focus = determineNutritionalFocus(target, consumed);

  // Get candidate foods
  const candidates = getCandidateFoods(dietaryPref, nextMeal, focus);

  // Build meal combinations
  const suggestions = buildMealSuggestions(candidates, mealBudget, focus, nextMeal);

  // Add contextual reasons
  const reasonedSuggestions = suggestions.map((s) => ({
    ...s,
    reason: generateReason(target, consumed, focus, nextMeal),
  }));

  return { suggestions: reasonedSuggestions, flags };
}

type NutritionalFocus = 'high-protein' | 'low-calorie' | 'low-fat' | 'high-fiber' | 'balanced';

function determineNutritionalFocus(
  target: NutritionInfo,
  consumed: NutritionInfo
): NutritionalFocus {
  const calPct = consumed.calories / target.calories;
  const protPct = consumed.protein / target.protein;
  const fatPct = consumed.fat / target.fat;
  const fiberPct = consumed.fiber / target.fiber;

  // If calories are high relative to protein, need high-protein
  if (protPct < calPct - 0.15) return 'high-protein';

  // If fat is disproportionately high
  if (fatPct > calPct + 0.15) return 'low-fat';

  // If calories already exceed expected proportion
  if (calPct > 0.7) return 'low-calorie';

  // If fiber is very low
  if (fiberPct < 0.3 && calPct > 0.3) return 'high-fiber';

  return 'balanced';
}

function getNextMealType(mealsLogged: MealType[]): MealType | null {
  for (const meal of MEAL_TYPE_ORDER) {
    if (!mealsLogged.includes(meal)) return meal;
  }
  return null;
}

function getRemainingMeals(mealsLogged: MealType[]): MealType[] {
  return MEAL_TYPE_ORDER.filter((m) => !mealsLogged.includes(m));
}

function calculateMealBudget(
  remaining: NutritionInfo,
  mealType: MealType,
  remainingMealCount: number
): NutritionInfo {
  // Distribute remaining budget proportionally based on meal type weight
  const totalWeight = getRemainingMeals([]).reduce(
    (sum, m) => sum + MEAL_CALORIE_DISTRIBUTION[m],
    0
  );
  const thisMealWeight = MEAL_CALORIE_DISTRIBUTION[mealType];
  const ratio = remainingMealCount > 0 ? thisMealWeight / (totalWeight || 1) : 1;

  return {
    calories: Math.round(remaining.calories * ratio),
    protein: Math.round(remaining.protein * ratio * 10) / 10,
    carbs: Math.round(remaining.carbs * ratio * 10) / 10,
    fat: Math.round(remaining.fat * ratio * 10) / 10,
    fiber: Math.round(remaining.fiber * ratio * 10) / 10,
    iron: Math.round(remaining.iron * ratio * 10) / 10,
    calcium: Math.round(remaining.calcium * ratio),
    vitaminC: Math.round(remaining.vitaminC * ratio * 10) / 10,
  };
}

function getCandidateFoods(
  dietaryPref: DietaryPreference,
  mealType: MealType,
  focus: NutritionalFocus
): FoodItem[] {
  let foods = INDIAN_FOODS.filter((f) => {
    // Dietary preference filter
    if (dietaryPref === 'vegetarian' && !f.isVegetarian) return false;
    if (dietaryPref === 'eggetarian' && !f.isVegetarian && f.category !== 'eggs') return false;

    // Meal type appropriateness
    if (mealType === 'breakfast' && f.tags.includes('breakfast')) return true;
    if (mealType === 'lunch' && (f.tags.includes('lunch') || f.tags.includes('main-course'))) return true;
    if (mealType === 'dinner' && (f.tags.includes('dinner') || f.tags.includes('main-course'))) return true;
    if (mealType === 'snack' && (f.tags.includes('snack') || f.tags.includes('beverage'))) return true;

    // If no specific meal tag, include for lunch and dinner
    if ((mealType === 'lunch' || mealType === 'dinner') && !f.tags.includes('breakfast') && !f.tags.includes('snack') && !f.tags.includes('sweet')) {
      return true;
    }
    return false;
  });

  // Apply focus-based sorting
  switch (focus) {
    case 'high-protein':
      foods.sort((a, b) => b.nutritionPer100g.protein - a.nutritionPer100g.protein);
      break;
    case 'low-calorie':
      foods.sort((a, b) => a.nutritionPer100g.calories - b.nutritionPer100g.calories);
      break;
    case 'low-fat':
      foods.sort((a, b) => a.nutritionPer100g.fat - b.nutritionPer100g.fat);
      break;
    case 'high-fiber':
      foods.sort((a, b) => b.nutritionPer100g.fiber - a.nutritionPer100g.fiber);
      break;
    default:
      // Balanced: prefer items with good protein-to-calorie ratio
      foods.sort((a, b) => {
        const ratioA = a.nutritionPer100g.protein / (a.nutritionPer100g.calories || 1);
        const ratioB = b.nutritionPer100g.protein / (b.nutritionPer100g.calories || 1);
        return ratioB - ratioA;
      });
  }

  return foods.slice(0, 30); // Top candidates
}

function buildMealSuggestions(
  candidates: FoodItem[],
  budget: NutritionInfo,
  focus: NutritionalFocus,
  mealType: MealType
): MealSuggestion[] {
  const suggestions: MealSuggestion[] = [];

  // Strategy: Build 2-3 meal combos from candidates
  // Each combo has a main + side + optional accompaniment

  const mains = candidates.filter(
    (f) =>
      f.tags.includes('main-course') ||
      f.tags.includes('rice-dish') ||
      f.tags.includes('curry') ||
      f.category === 'dal-legumes' ||
      f.category === 'rice-dishes' ||
      f.category === 'curries' ||
      f.category === 'non-veg' ||
      f.category === 'eggs'
  );

  const sides = candidates.filter(
    (f) =>
      f.tags.includes('side-dish') ||
      f.category === 'bread-roti' ||
      f.category === 'vegetables' ||
      f.tags.includes('accompaniment')
  );

  const breakfastItems = candidates.filter((f) => f.tags.includes('breakfast'));

  if (mealType === 'breakfast') {
    // For breakfast, suggest individual items or simple combos
    for (let i = 0; i < Math.min(3, breakfastItems.length); i++) {
      const food = breakfastItems[i];
      const servings = Math.max(1, Math.round(budget.calories / (food.nutritionPer100g.calories * food.servingSize / 100)));
      const cals = Math.round(food.nutritionPer100g.calories * food.servingSize * servings / 100);
      const protein = Math.round(food.nutritionPer100g.protein * food.servingSize * servings / 100 * 10) / 10;

      suggestions.push({
        foods: [{ food, servings, calories: cals, protein }],
        reason: '',
        totalCalories: cals,
        totalProtein: protein,
        totalCarbs: Math.round(food.nutritionPer100g.carbs * food.servingSize * servings / 100 * 10) / 10,
        totalFat: Math.round(food.nutritionPer100g.fat * food.servingSize * servings / 100 * 10) / 10,
      });
    }
  } else {
    // For lunch/dinner, build combos: main + side
    for (let i = 0; i < Math.min(3, mains.length); i++) {
      const main = mains[i];
      const side = sides[i % sides.length] || sides[0];

      if (!main || !side) continue;

      const mainServings = 1;
      const sideServings = mealType === 'dinner' ? 2 : 2;

      const mainCals = Math.round(main.nutritionPer100g.calories * main.servingSize * mainServings / 100);
      const sideCals = Math.round(side.nutritionPer100g.calories * side.servingSize * sideServings / 100);
      const mainProtein = Math.round(main.nutritionPer100g.protein * main.servingSize * mainServings / 100 * 10) / 10;
      const sideProtein = Math.round(side.nutritionPer100g.protein * side.servingSize * sideServings / 100 * 10) / 10;

      suggestions.push({
        foods: [
          { food: main, servings: mainServings, calories: mainCals, protein: mainProtein },
          { food: side, servings: sideServings, calories: sideCals, protein: sideProtein },
        ],
        reason: '',
        totalCalories: mainCals + sideCals,
        totalProtein: mainProtein + sideProtein,
        totalCarbs: Math.round(
          (main.nutritionPer100g.carbs * main.servingSize * mainServings / 100) +
          (side.nutritionPer100g.carbs * side.servingSize * sideServings / 100)
        ),
        totalFat: Math.round(
          (main.nutritionPer100g.fat * main.servingSize * mainServings / 100) +
          (side.nutritionPer100g.fat * side.servingSize * sideServings / 100)
        ),
      });
    }
  }

  return suggestions.slice(0, 3);
}

function generateReason(
  target: NutritionInfo,
  consumed: NutritionInfo,
  focus: NutritionalFocus,
  mealType: MealType
): string {
  const calPct = Math.round((consumed.calories / target.calories) * 100);
  const protPct = Math.round((consumed.protein / target.protein) * 100);

  switch (focus) {
    case 'high-protein':
      return `Your protein intake is low (${protPct}% of target) compared to calories (${calPct}%). This ${mealType} focuses on protein-rich foods to help you catch up.`;
    case 'low-calorie':
      return `You've already consumed ${calPct}% of your daily calories. This lighter ${mealType} helps you stay within your target.`;
    case 'low-fat':
      return `Fat intake is on the higher side today. This ${mealType} keeps fat low while maintaining good nutrition.`;
    case 'high-fiber':
      return `Your fiber intake needs a boost. This ${mealType} includes fiber-rich options for better digestion.`;
    default:
      return `A balanced ${mealType} to keep your nutrition on track for the rest of the day.`;
  }
}
