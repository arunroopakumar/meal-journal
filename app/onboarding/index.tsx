import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { COLORS, APP_NAME, APP_TAGLINE } from '../../utils/constants';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🍽️</Text>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.tagline}>{APP_TAGLINE}</Text>

        <View style={styles.features}>
          <FeatureItem icon="📝" text="Log your daily meals easily" />
          <FeatureItem icon="📊" text="Track calories, protein, carbs & more" />
          <FeatureItem icon="💡" text="Get smart suggestions to balance nutrition" />
          <FeatureItem icon="🇮🇳" text="200+ Indian foods built-in" />
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/onboarding/profile')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureRow}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  features: {
    alignSelf: 'stretch',
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 14,
  },
  featureText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
