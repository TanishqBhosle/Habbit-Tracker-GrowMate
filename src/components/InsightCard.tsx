import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface InsightCardProps {
  title: string;
  value: string | number;
  description?: string;
  color?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  value, 
  description,
  color 
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color: color || theme.colors.primary }]}>{value}</Text>
      {description && <Text style={styles.description}>{description}</Text>
}
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    width: '48%',
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    ...typography.bodyLarge,
    color: theme.colors.textSecondary,
    marginBottom: spacing.sm,
  },
  value: {
    ...typography.h1,
    color: theme.colors.primary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.bodySmall,
    color: theme.colors.textSecondary,
  },
});