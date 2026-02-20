export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
export type DietaryPreference = 'vegetarian' | 'non_vegetarian' | 'eggetarian';
export type GoalType = 'maintain' | 'lose' | 'gain';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  height: number;          // cm
  weight: number;          // kg
  activityLevel: ActivityLevel;
  dietaryPreference: DietaryPreference;
  goal: GoalType;
  calorieTarget: number;   // auto-calculated or manually set
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  fiberTarget: number;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ACTIVITY_LEVEL_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (desk job)',
  lightly_active: 'Lightly Active (1-2 days exercise)',
  moderately_active: 'Moderately Active (3-5 days)',
  very_active: 'Very Active (6-7 days)',
};

export const ACTIVITY_LEVEL_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
};

export const GOAL_LABELS: Record<GoalType, string> = {
  maintain: 'Maintain Weight',
  lose: 'Lose Weight',
  gain: 'Gain Weight',
};

export const DIETARY_PREF_LABELS: Record<DietaryPreference, string> = {
  vegetarian: 'Vegetarian',
  non_vegetarian: 'Non-Vegetarian',
  eggetarian: 'Eggetarian',
};
