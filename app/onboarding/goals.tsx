import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
  GoalType, GOAL_LABELS, Gender, ActivityLevel, DietaryPreference,
  UserProfile,
} from '../../models/UserProfile';
import {
  calculateCalorieTarget, calculateMacroTargets,
} from '../../utils/nutritionCalc';
import { generateId } from '../../utils/dateUtils';
import { useMealContext } from '../../contexts/MealContext';
import { COLORS } from '../../utils/constants';

export default function GoalsScreen() {
  const params = useLocalSearchParams<{
    name: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
    activityLevel: string;
    dietaryPreference: string;
  }>();

  const { completeOnboarding } = useMealContext();
  const [goal, setGoal] = useState<GoalType>('maintain');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gender = params.gender as Gender;
  const age = parseInt(params.age, 10);
  const height = parseFloat(params.height);
  const weight = parseFloat(params.weight);
  const activityLevel = params.activityLevel as ActivityLevel;
  const dietaryPreference = params.dietaryPreference as DietaryPreference;

  const targets = useMemo(() => {
    const calories = calculateCalorieTarget(gender, weight, height, age, activityLevel, goal);
    const macros = calculateMacroTargets(calories, goal, weight);
    return { calories, ...macros };
  }, [gender, weight, height, age, activityLevel, goal]);

  async function handleConfirm() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const now = new Date().toISOString();
      const profile: UserProfile = {
        id: generateId(),
        name: params.name,
        age,
        gender,
        height,
        weight,
        activityLevel,
        dietaryPreference,
        goal,
        calorieTarget: targets.calories,
        proteinTarget: targets.protein,
        carbsTarget: targets.carbs,
        fatTarget: targets.fat,
        fiberTarget: targets.fiber,
        onboardingComplete: true,
        createdAt: now,
        updatedAt: now,
      };
      await completeOnboarding(profile);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Your Daily Targets</Text>
      <Text style={styles.subheading}>
        Based on your profile, here are your recommended daily targets.
        Choose your goal to adjust.
      </Text>

      {/* Goal Selection */}
      <Text style={styles.label}>Your Goal</Text>
      <View style={styles.goalRow}>
        {(Object.entries(GOAL_LABELS) as [GoalType, string][]).map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[styles.goalBtn, goal === key && styles.goalBtnSelected]}
            onPress={() => setGoal(key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.goalBtnText, goal === key && styles.goalBtnTextSelected]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Targets Display */}
      <View style={styles.targetsCard}>
        <TargetRow label="Daily Calories" value={`${targets.calories} kcal`} highlight />
        <TargetRow label="Protein" value={`${targets.protein}g`} />
        <TargetRow label="Carbs" value={`${targets.carbs}g`} />
        <TargetRow label="Fat" value={`${targets.fat}g`} />
        <TargetRow label="Fiber" value={`${targets.fiber}g`} />
      </View>

      <Text style={styles.note}>
        Calculated using the Mifflin-St Jeor equation based on your age, height, weight,
        and activity level. You can adjust these targets later in your profile.
      </Text>

      <TouchableOpacity
        style={[styles.confirmButton, isSubmitting && styles.confirmButtonDisabled]}
        onPress={handleConfirm}
        disabled={isSubmitting}
        activeOpacity={0.8}
      >
        <Text style={styles.confirmButtonText}>
          {isSubmitting ? 'Setting up...' : 'Confirm & Start'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function TargetRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.targetRow}>
      <Text style={[styles.targetLabel, highlight && styles.targetLabelHighlight]}>{label}</Text>
      <Text style={[styles.targetValue, highlight && styles.targetValueHighlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  goalRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  goalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  goalBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  goalBtnText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  goalBtnTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  targetsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 16,
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  targetLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  targetLabelHighlight: {
    fontWeight: '700',
    fontSize: 16,
  },
  targetValue: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  targetValueHighlight: {
    color: COLORS.calorieColor,
    fontWeight: '700',
    fontSize: 16,
  },
  note: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 30,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
