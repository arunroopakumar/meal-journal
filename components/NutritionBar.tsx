import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

interface NutritionBarProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  compact?: boolean;
}

export default function NutritionBar({ label, current, target, unit, color, compact }: NutritionBarProps) {
  const progress = target > 0 ? Math.min(1, current / target) : 0;
  const percentage = Math.round(progress * 100);
  const isOver = current > target;

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <Text style={styles.compactLabel}>{label}</Text>
        <View style={styles.compactBarBg}>
          <View style={[styles.compactBarFill, { width: `${Math.min(100, percentage)}%`, backgroundColor: color }]} />
        </View>
        <Text style={styles.compactValue}>
          {Math.round(current)}/{target}{unit}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, isOver && styles.overValue]}>
          {Math.round(current * 10) / 10} / {target} {unit}
        </Text>
      </View>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${Math.min(100, percentage)}%`,
              backgroundColor: isOver ? COLORS.error : color,
            },
          ]}
        />
      </View>
      <Text style={[styles.percentage, { color: isOver ? COLORS.error : COLORS.textSecondary }]}>
        {percentage}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  value: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  overValue: {
    color: COLORS.error,
  },
  barBackground: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'right',
  },
  // Compact styles
  compactContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 4,
  },
  compactLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  compactBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 2,
  },
  compactBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  compactValue: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
