import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useMealContext } from '../contexts/MealContext';
import SuggestionCard from '../components/SuggestionCard';
import { COLORS } from '../utils/constants';

export default function SuggestionsScreen() {
  const { state } = useMealContext();
  const { suggestions, nutritionFlags } = state;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Smart Suggestions</Text>
      <Text style={styles.subheading}>
        Based on what you've eaten today, here's what we recommend for your next meal.
      </Text>

      {/* Nutrition Flags */}
      {nutritionFlags.map((flag, idx) => (
        <View
          key={idx}
          style={[
            styles.flagCard,
            flag.type === 'warning' && styles.flagWarning,
            flag.type === 'success' && styles.flagSuccess,
            flag.type === 'info' && styles.flagInfo,
          ]}
        >
          <Text style={styles.flagText}>{flag.message}</Text>
        </View>
      ))}

      {/* Suggestions */}
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, idx) => (
          <SuggestionCard key={idx} suggestion={suggestion} />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💡</Text>
          <Text style={styles.emptyText}>
            Log a meal first to get personalized suggestions!
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
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
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  flagCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
  },
  flagWarning: {
    backgroundColor: '#FFF3E0',
    borderLeftColor: COLORS.warning,
  },
  flagSuccess: {
    backgroundColor: '#E8F5E9',
    borderLeftColor: COLORS.success,
  },
  flagInfo: {
    backgroundColor: '#E3F2FD',
    borderLeftColor: COLORS.accent,
  },
  flagText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
