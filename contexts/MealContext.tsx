import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { NutritionInfo, MealFoodItem } from '../models/FoodItem';
import { Meal, MealType, DailyLog, aggregateNutrition, MEAL_TYPE_ORDER } from '../models/Meal';
import { UserProfile } from '../models/UserProfile';
import * as db from '../services/database';
import * as storage from '../services/storage';
import { getToday, generateId } from '../utils/dateUtils';
import { calculateNutritionTargets } from '../utils/nutritionCalc';
import { generateSuggestions, MealSuggestion } from '../services/suggestionEngine';
import { NutritionFlag } from '../utils/nutritionCalc';

// ─── State ──────────────────────────────────────────────────────────────

interface MealState {
  profile: UserProfile | null;
  selectedDate: string;
  meals: Meal[];
  dailyNutrition: NutritionInfo;
  targetNutrition: NutritionInfo;
  suggestions: MealSuggestion[];
  nutritionFlags: NutritionFlag[];
  isLoading: boolean;
  onboardingComplete: boolean;
}

const initialNutrition: NutritionInfo = {
  calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, iron: 0, calcium: 0, vitaminC: 0,
};

const initialState: MealState = {
  profile: null,
  selectedDate: getToday(),
  meals: [],
  dailyNutrition: initialNutrition,
  targetNutrition: { ...initialNutrition, calories: 2000, protein: 55, carbs: 275, fat: 65, fiber: 30, iron: 17, calcium: 600, vitaminC: 40 },
  suggestions: [],
  nutritionFlags: [],
  isLoading: true,
  onboardingComplete: false,
};

// ─── Actions ────────────────────────────────────────────────────────────

type MealAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PROFILE'; payload: UserProfile }
  | { type: 'SET_ONBOARDING'; payload: boolean }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_MEALS'; payload: Meal[] }
  | { type: 'SET_DAILY_NUTRITION'; payload: NutritionInfo }
  | { type: 'SET_TARGET_NUTRITION'; payload: NutritionInfo }
  | { type: 'SET_SUGGESTIONS'; payload: { suggestions: MealSuggestion[]; flags: NutritionFlag[] } }
  | { type: 'ADD_MEAL'; payload: Meal }
  | { type: 'REMOVE_MEAL'; payload: string };

function mealReducer(state: MealState, action: MealAction): MealState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_ONBOARDING':
      return { ...state, onboardingComplete: action.payload };
    case 'SET_DATE':
      return { ...state, selectedDate: action.payload };
    case 'SET_MEALS':
      return { ...state, meals: action.payload };
    case 'SET_DAILY_NUTRITION':
      return { ...state, dailyNutrition: action.payload };
    case 'SET_TARGET_NUTRITION':
      return { ...state, targetNutrition: action.payload };
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload.suggestions, nutritionFlags: action.payload.flags };
    case 'ADD_MEAL':
      return { ...state, meals: [...state.meals, action.payload] };
    case 'REMOVE_MEAL':
      return { ...state, meals: state.meals.filter((m) => m.id !== action.payload) };
    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────────────────────

interface MealContextType {
  state: MealState;
  loadProfile: () => Promise<void>;
  saveProfile: (profile: UserProfile) => Promise<void>;
  setSelectedDate: (date: string) => void;
  loadMealsForDate: (date: string) => Promise<void>;
  logMeal: (mealType: MealType, items: MealFoodItem[]) => Promise<void>;
  deleteMeal: (mealId: string) => Promise<void>;
  refreshSuggestions: () => void;
  completeOnboarding: (profile: UserProfile) => Promise<void>;
  reloadToday: () => Promise<void>;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

// ─── Provider ───────────────────────────────────────────────────────────

export function MealProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(mealReducer, initialState);

  // Use refs to always have the latest values in async functions
  const profileRef = useRef<UserProfile | null>(null);
  const selectedDateRef = useRef(getToday());

  // Keep refs in sync with state
  useEffect(() => {
    profileRef.current = state.profile;
  }, [state.profile]);

  useEffect(() => {
    selectedDateRef.current = state.selectedDate;
  }, [state.selectedDate]);

  // Initialize on mount
  useEffect(() => {
    initializeApp();
  }, []);

  // Refresh suggestions when meals change
  useEffect(() => {
    if (state.profile && state.selectedDate === getToday()) {
      refreshSuggestions();
    }
  }, [state.meals, state.profile]);

  async function initializeApp() {
    try {
      const onboarded = await storage.isOnboardingComplete();
      dispatch({ type: 'SET_ONBOARDING', payload: onboarded });

      if (onboarded) {
        const profile = await db.getUserProfile();
        if (profile) {
          profileRef.current = profile;
          dispatch({ type: 'SET_PROFILE', payload: profile });
          const targets = calculateNutritionTargets(profile);
          dispatch({ type: 'SET_TARGET_NUTRITION', payload: targets });
          // Use profile.id directly instead of stale state
          const meals = await db.getMealsForDate(profile.id, getToday());
          dispatch({ type: 'SET_MEALS', payload: meals });
          const nutrition = await db.getDailyNutrition(profile.id, getToday());
          dispatch({ type: 'SET_DAILY_NUTRITION', payload: nutrition });
        }
      }
    } catch (error) {
      console.error('Failed to initialize app:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  async function loadProfile() {
    const profile = await db.getUserProfile();
    if (profile) {
      profileRef.current = profile;
      dispatch({ type: 'SET_PROFILE', payload: profile });
      const targets = calculateNutritionTargets(profile);
      dispatch({ type: 'SET_TARGET_NUTRITION', payload: targets });
    }
  }

  async function saveProfileAction(profile: UserProfile) {
    await db.saveUserProfile(profile);
    profileRef.current = profile;
    dispatch({ type: 'SET_PROFILE', payload: profile });
    const targets = calculateNutritionTargets(profile);
    dispatch({ type: 'SET_TARGET_NUTRITION', payload: targets });
  }

  async function loadMealsForDate(date: string) {
    const userId = profileRef.current?.id || (await storage.getUserId()) || '';
    if (!userId) return;
    const meals = await db.getMealsForDate(userId, date);
    dispatch({ type: 'SET_MEALS', payload: meals });
    const nutrition = await db.getDailyNutrition(userId, date);
    dispatch({ type: 'SET_DAILY_NUTRITION', payload: nutrition });
  }

  function setSelectedDate(date: string) {
    selectedDateRef.current = date;
    dispatch({ type: 'SET_DATE', payload: date });
    loadMealsForDate(date);
  }

  async function logMeal(mealType: MealType, items: MealFoodItem[]) {
    // Use ref to avoid stale closure - this is the key fix
    const profile = profileRef.current;
    const date = selectedDateRef.current;
    if (!profile) {
      console.error('logMeal: No profile found, cannot save meal');
      return;
    }
    const now = new Date().toISOString();
    const meal: Meal = {
      id: generateId(),
      userId: profile.id,
      date,
      mealType,
      items,
      totalNutrition: aggregateNutrition(items),
      createdAt: now,
      updatedAt: now,
    };
    await db.saveMeal(meal);
    dispatch({ type: 'ADD_MEAL', payload: meal });
    // Refresh nutrition totals from DB
    const nutrition = await db.getDailyNutrition(profile.id, date);
    dispatch({ type: 'SET_DAILY_NUTRITION', payload: nutrition });
  }

  async function deleteMealAction(mealId: string) {
    await db.deleteMeal(mealId);
    dispatch({ type: 'REMOVE_MEAL', payload: mealId });
    const profile = profileRef.current;
    const date = selectedDateRef.current;
    if (profile) {
      const nutrition = await db.getDailyNutrition(profile.id, date);
      dispatch({ type: 'SET_DAILY_NUTRITION', payload: nutrition });
    }
  }

  function refreshSuggestions() {
    if (!state.profile) return;
    const loggedMealTypes = state.meals.map((m) => m.mealType);
    const result = generateSuggestions(
      state.targetNutrition,
      state.dailyNutrition,
      loggedMealTypes,
      state.profile.dietaryPreference
    );
    dispatch({ type: 'SET_SUGGESTIONS', payload: result });
  }

  async function completeOnboarding(profile: UserProfile) {
    await db.saveUserProfile(profile);
    await storage.setOnboardingComplete(true);
    await storage.setUserId(profile.id);
    profileRef.current = profile;
    dispatch({ type: 'SET_PROFILE', payload: profile });
    dispatch({ type: 'SET_ONBOARDING', payload: true });
    const targets = calculateNutritionTargets(profile);
    dispatch({ type: 'SET_TARGET_NUTRITION', payload: targets });
  }

  async function reloadToday() {
    const profile = profileRef.current;
    if (!profile) return;
    const today = getToday();
    const meals = await db.getMealsForDate(profile.id, today);
    dispatch({ type: 'SET_MEALS', payload: meals });
    const nutrition = await db.getDailyNutrition(profile.id, today);
    dispatch({ type: 'SET_DAILY_NUTRITION', payload: nutrition });
  }

  return (
    <MealContext.Provider
      value={{
        state,
        loadProfile,
        saveProfile: saveProfileAction,
        setSelectedDate,
        loadMealsForDate,
        logMeal,
        deleteMeal: deleteMealAction,
        refreshSuggestions,
        completeOnboarding,
        reloadToday,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}

export function useMealContext(): MealContextType {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMealContext must be used within a MealProvider');
  }
  return context;
}
