import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MealProvider } from '../contexts/MealContext';
import { COLORS } from '../utils/constants';

export default function RootLayout() {
  return (
    <MealProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.surface },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding/index"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="onboarding/profile"
          options={{ title: 'Setup Profile', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="onboarding/goals"
          options={{ title: 'Your Goals', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="meal/[id]"
          options={{ title: 'Meal Details' }}
        />
        <Stack.Screen
          name="suggestions"
          options={{ title: 'Suggestions', presentation: 'modal' }}
        />
      </Stack>
    </MealProvider>
  );
}
