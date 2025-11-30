import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface WeeklyChartProps {
  data: { day: string; completed: boolean }[];
}

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ data }) => {
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
    ...typography.h3,
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    marginBottom: spacing.sm,
  },
  dayText: {
    ...typography.caption,
    color: theme.colors.textSecondary,
  },
  bar: {
    width: 20,
    borderRadius: 4,
  },
  completedBar: {
    backgroundColor: theme.colors.success,
    height: '100%',
  },
  missedBar: {
    backgroundColor: theme.colors.background,
    height: 20,
  },
});