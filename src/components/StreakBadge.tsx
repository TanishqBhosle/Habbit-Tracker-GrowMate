import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface StreakBadgeProps {
  streak: number;
  size?: 'small' | 'large';
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak, size = 'large' }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  
  if (streak === 0) return null;
  
  return (
    <View style={[styles.container, size === 'small' && styles.smallContainer]}>
      <Text style={[styles.text, size === 'small' && styles.smallText]}>
        🔥 {streak} {streak === 1 ? 'Day' : 'Days'}
      </Text>
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  smallContainer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
  },
  text: {
    ...typography.bodyMedium,
    color: theme.colors.surface,
    fontWeight: '600',
  },
  smallText: {
    ...typography.caption,
    fontWeight: '600',
  },
});