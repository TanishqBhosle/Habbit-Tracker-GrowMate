import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { useHabits } from '../hooks/useHabits';
import { AnalyticsService } from '../services/analyticsService';
import type { Habit } from '@store/habitStore';
import { InsightCard } from '../components/InsightCard';
import { WeeklyChart } from '../components/WeeklyChart';
import { EmptyState } from '../components/EmptyState';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const InsightsScreen: React.FC = () => {
  const { habits, isLoading } = useHabits();
  const [analytics, setAnalytics] = useState<any>(null);
  
  // Ensure habits is always an array
  const safeHabits = Array.isArray(habits) ? habits : [];

  useEffect(() => {
    if (safeHabits.length > 0) {
      const weeklyAnalytics = AnalyticsService.calculateWeeklyAnalytics(safeHabits);
      setAnalytics(weeklyAnalytics);
    }
  }, [safeHabits]);

  if (isLoading) {
    return <LoadingSpinner text="Loading insights..." />;
  }

  if (safeHabits.length === 0) {
    return (
      <EmptyState
        title="No habits yet"
        description="Create habits to see your insights"
        icon="📊"
      />
    );
  }

  // Generate weekly data for chart
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  const weeklyData = weekDays.map((day, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const dateString = date.toISOString().split('T')[0];
    
    // Count completed habits for this day
    const completedCount = safeHabits.reduce((count: number, habit: Habit) => {
      return habit.completedDates.includes(dateString) ? count + 1 : count;
    }, 0);
    
    return {
      day,
      completed: completedCount > 0
    };
  });

  // Calculate category distribution
  const categoryDistribution: Record<string, number> = {};
  safeHabits.forEach((habit: Habit) => {
    if (!categoryDistribution[habit.category]) {
      categoryDistribution[habit.category] = 0;
    }
    categoryDistribution[habit.category]++;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Weekly Insights</Text>
      
      <View style={styles.grid}>
        <InsightCard
          title="Total Completed"
          value={analytics?.totalCompleted || 0}
          description="This week"
        />
        
        <InsightCard
          title="Completion Rate"
          value={`${analytics?.completionRate || 0}%`}
          description="Of all possible completions"
        />
        
        <InsightCard
          title="Best Habit"
          value={analytics?.bestHabit || 'None'}
          description="Most consistent this week"
        />
        
        <InsightCard
          title="Missed Days"
          value={analytics?.missedDays || 0}
          description="Opportunities missed"
        />
      </View>
      
      <WeeklyChart data={weeklyData} />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Category Distribution</Text>
        {Object.entries(categoryDistribution).map(([category, count]) => (
          <View key={category} style={styles.categoryRow}>
            <Text style={styles.categoryName}>{category}</Text>
            <Text style={styles.categoryCount}>{count}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: theme.colors.text,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  section: {
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
  sectionTitle: {
    ...typography.h3,
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  categoryName: {
    ...typography.bodyMedium,
    color: theme.colors.text,
  },
  categoryCount: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
});