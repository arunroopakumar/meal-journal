import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert,
} from 'react-native';
import { useMealContext } from '../../contexts/MealContext';
import NutritionBar from '../../components/NutritionBar';
import {
  ACTIVITY_LEVEL_LABELS, GOAL_LABELS, DIETARY_PREF_LABELS,
  ActivityLevel, GoalType, DietaryPreference,
} from '../../models/UserProfile';
import { calculateNutritionTargets } from '../../utils/nutritionCalc';
import { COLORS } from '../../utils/constants';

export default function ProfileScreen() {
  const { state, saveProfile } = useMealContext();
  const { profile, targetNutrition, dailyNutrition } = state;
  const [isEditing, setIsEditing] = useState(false);

  // Edit state
  const [editWeight, setEditWeight] = useState(profile?.weight.toString() || '');
  const [editActivity, setEditActivity] = useState<ActivityLevel>(profile?.activityLevel || 'sedentary');
  const [editGoal, setEditGoal] = useState<GoalType>(profile?.goal || 'maintain');
  const [editDiet, setEditDiet] = useState<DietaryPreference>(profile?.dietaryPreference || 'vegetarian');

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Profile not set up yet.</Text>
      </View>
    );
  }

  async function handleSave() {
    const newWeight = parseFloat(editWeight) || profile!.weight;
    const updatedProfile = {
      ...profile!,
      weight: newWeight,
      activityLevel: editActivity,
      goal: editGoal,
      dietaryPreference: editDiet,
      updatedAt: new Date().toISOString(),
    };

    const targets = calculateNutritionTargets(updatedProfile);
    updatedProfile.calorieTarget = targets.calories;
    updatedProfile.proteinTarget = targets.protein;
    updatedProfile.carbsTarget = targets.carbs;
    updatedProfile.fatTarget = targets.fat;
    updatedProfile.fiberTarget = targets.fiber;

    try {
      await saveProfile(updatedProfile);
      setIsEditing(false);
      Alert.alert('Saved', 'Profile updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile.');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Info */}
      <View style={styles.profileCard}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileInfo}>
          {profile.age} years | {profile.gender === 'male' ? 'Male' : 'Female'} | {profile.height}cm
        </Text>
      </View>

      {/* Current Targets */}
      <Text style={styles.sectionTitle}>Daily Targets</Text>
      <View style={styles.targetsCard}>
        <TargetRow label="Calories" value={`${targetNutrition.calories} kcal`} />
        <TargetRow label="Protein" value={`${targetNutrition.protein}g`} />
        <TargetRow label="Carbs" value={`${targetNutrition.carbs}g`} />
        <TargetRow label="Fat" value={`${targetNutrition.fat}g`} />
        <TargetRow label="Fiber" value={`${targetNutrition.fiber}g`} />
      </View>

      {/* Today's Progress */}
      <Text style={styles.sectionTitle}>Today's Progress</Text>
      <View style={styles.progressCard}>
        <NutritionBar
          label="Calories"
          current={dailyNutrition.calories}
          target={targetNutrition.calories}
          unit=" kcal"
          color={COLORS.calorieColor}
        />
        <NutritionBar
          label="Protein"
          current={dailyNutrition.protein}
          target={targetNutrition.protein}
          unit="g"
          color={COLORS.proteinColor}
        />
      </View>

      {/* Edit Section */}
      {!isEditing ? (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.editCard}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>

          <Text style={styles.editLabel}>Weight (kg)</Text>
          <TextInput
            style={styles.editInput}
            value={editWeight}
            onChangeText={setEditWeight}
            keyboardType="decimal-pad"
          />

          <Text style={styles.editLabel}>Activity Level</Text>
          {(Object.entries(ACTIVITY_LEVEL_LABELS) as [ActivityLevel, string][]).map(([key, label]) => (
            <TouchableOpacity
              key={key}
              style={[styles.editOption, editActivity === key && styles.editOptionSelected]}
              onPress={() => setEditActivity(key)}
            >
              <Text style={[styles.editOptionText, editActivity === key && styles.editOptionTextSelected]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.editLabel}>Goal</Text>
          <View style={styles.editRow}>
            {(Object.entries(GOAL_LABELS) as [GoalType, string][]).map(([key, label]) => (
              <TouchableOpacity
                key={key}
                style={[styles.editChip, editGoal === key && styles.editChipSelected]}
                onPress={() => setEditGoal(key)}
              >
                <Text style={[styles.editChipText, editGoal === key && styles.editChipTextSelected]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.editLabel}>Dietary Preference</Text>
          <View style={styles.editRow}>
            {(Object.entries(DIETARY_PREF_LABELS) as [DietaryPreference, string][]).map(([key, label]) => (
              <TouchableOpacity
                key={key}
                style={[styles.editChip, editDiet === key && styles.editChipSelected]}
                onPress={() => setEditDiet(key)}
              >
                <Text style={[styles.editChipText, editDiet === key && styles.editChipTextSelected]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

function TargetRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.targetRow}>
      <Text style={styles.targetLabel}>{label}</Text>
      <Text style={styles.targetValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  profileCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  profileInfo: {
    fontSize: 14,
    color: COLORS.primaryDark,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  targetsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  targetLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  targetValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  progressCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  editButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  // Edit card styles
  editCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  editLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 14,
    marginBottom: 8,
  },
  editInput: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 6,
  },
  editOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  editOptionText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  editOptionTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  editRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  editChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editChipSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  editChipText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  editChipTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});
