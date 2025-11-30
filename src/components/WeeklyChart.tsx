import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface WeeklyChartProps {
  data: { day: string; completed: boolean }[];
}

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ data }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This Week</Text>
      <View style={styles.chartContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.dayLabel}>
              <Text style={styles.dayText}>{item.day}</Text>
            </View>
            <View 
              style={[
                styles.bar, 
                item.completed ? styles.completedBar : styles.missedBar
              ]} 
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
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
    ...typography.h2,
    color: theme.colors.text,
    marginBottom: spacing.lg,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    marginBottom: spacing.md,
  },
  dayText: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  bar: {
    width: 24,
    borderRadius: 6,
  },
  completedBar: {
    backgroundColor: theme.colors.success,
    height: '100%',
  },
  missedBar: {
    backgroundColor: theme.colors.backgroundSecondary,
    height: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});