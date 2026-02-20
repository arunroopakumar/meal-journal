import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import {
  Gender, ActivityLevel, DietaryPreference,
  ACTIVITY_LEVEL_LABELS, DIETARY_PREF_LABELS,
} from '../../models/UserProfile';
import { COLORS } from '../../utils/constants';

export default function ProfileSetupScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreference>('vegetarian');

  const isValid = name.trim() && age && height && weight;

  function handleNext() {
    if (!isValid) return;
    router.push({
      pathname: '/onboarding/goals',
      params: {
        name: name.trim(),
        age,
        gender,
        height,
        weight,
        activityLevel,
        dietaryPreference,
      },
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Tell us about yourself</Text>
        <Text style={styles.subheading}>
          This helps us calculate your personalized nutrition targets.
        </Text>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          placeholderTextColor={COLORS.textLight}
          value={name}
          onChangeText={setName}
        />

        {/* Age */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 28"
          placeholderTextColor={COLORS.textLight}
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
        />

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.optionRow}>
          <OptionButton
            label="Male"
            selected={gender === 'male'}
            onPress={() => setGender('male')}
          />
          <OptionButton
            label="Female"
            selected={gender === 'female'}
            onPress={() => setGender('female')}
          />
        </View>

        {/* Height */}
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 170"
          placeholderTextColor={COLORS.textLight}
          value={height}
          onChangeText={setHeight}
          keyboardType="decimal-pad"
        />

        {/* Weight */}
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 68"
          placeholderTextColor={COLORS.textLight}
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
        />

        {/* Activity Level */}
        <Text style={styles.label}>Activity Level</Text>
        <View style={styles.optionColumn}>
          {(Object.entries(ACTIVITY_LEVEL_LABELS) as [ActivityLevel, string][]).map(
            ([key, label]) => (
              <OptionButton
                key={key}
                label={label}
                selected={activityLevel === key}
                onPress={() => setActivityLevel(key)}
                fullWidth
              />
            )
          )}
        </View>

        {/* Dietary Preference */}
        <Text style={styles.label}>Dietary Preference</Text>
        <View style={styles.optionRow}>
          {(Object.entries(DIETARY_PREF_LABELS) as [DietaryPreference, string][]).map(
            ([key, label]) => (
              <OptionButton
                key={key}
                label={label}
                selected={dietaryPreference === key}
                onPress={() => setDietaryPreference(key)}
              />
            )
          )}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, !isValid && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isValid}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next →</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function OptionButton({
  label, selected, onPress, fullWidth,
}: { label: string; selected: boolean; onPress: () => void; fullWidth?: boolean }) {
  return (
    <TouchableOpacity
      style={[
        styles.optionBtn,
        selected && styles.optionBtnSelected,
        fullWidth && styles.optionBtnFullWidth,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.optionBtnText, selected && styles.optionBtnTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
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
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionColumn: {
    gap: 8,
  },
  optionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  optionBtnSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  optionBtnFullWidth: {
    width: '100%',
  },
  optionBtnText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  optionBtnTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
