import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/colors';
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
  color = theme.colors.primary 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginBottom: spacing.xs,
  },
  value: {
    ...typography.h2,
    color: theme.colors.primary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.bodySmall,
    color: theme.colors.textSecondary,
  },
});