import React, { useEffect } from 'react';
import { Tabs, router } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMealContext } from '../../contexts/MealContext';
import { COLORS } from '../../utils/constants';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '🏠',
    Log: '➕',
    History: '📅',
    Profile: '👤',
  };
  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>
      {icons[label] || '📋'}
    </Text>
  );
}

export default function TabLayout() {
  const { state } = useMealContext();
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);

  // If no profile exists after loading completes, redirect to onboarding.
  // Uses router.replace imperatively (not <Redirect>) because returning
  // a non-navigator component from a layout breaks expo-router.
  useEffect(() => {
    if (!state.isLoading && !state.profile) {
      router.replace('/onboarding');
    }
  }, [state.isLoading, state.profile]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          height: 56 + bottomPadding,
          paddingBottom: bottomPadding,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.textPrimary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} />,
          headerTitle: 'Meal Journal',
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: 'Log Meal',
          tabBarIcon: ({ focused }) => <TabIcon label="Log" focused={focused} />,
          headerTitle: 'Log a Meal',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => <TabIcon label="History" focused={focused} />,
          headerTitle: 'History',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon label="Profile" focused={focused} />,
          headerTitle: 'My Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
  },
});
