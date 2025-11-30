import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { useHabitStore } from '@store/habitStore';
import { NotificationService } from '@services/notificationService';
import { Habit } from '@store/habitStore';

export const SettingsScreen: React.FC = () => {
  const { habits, deleteHabit } = useHabitStore();
  
  // Ensure habits is always an array
  const safeHabits = Array.isArray(habits) ? habits : [];

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all habits and data? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Cancel all notifications
              await NotificationService.cancelAllReminders();
              
              // Delete all habits
              for (const habit of safeHabits) {
                await deleteHabit(habit.id);
              }
              
              Alert.alert('Success', 'All data has been cleared');
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data');
            }
          }
        }
      ]
    );
  };

  const handleRequestNotificationPermission = async () => {
    const granted = await NotificationService.requestPermissions();
    if (granted) {
      Alert.alert('Success', 'Notification permission granted');
    } else {
      Alert.alert('Permission Denied', 'Please enable notifications in your device settings');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleRequestNotificationPermission}
        >
          <Text style={styles.settingText}>Request Notification Permission</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={handleClearAllData}
        >
          <Text style={[styles.settingText, styles.dangerText]}>Clear All Data</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>App Version</Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Developer</Text>
          <Text style={styles.settingValue}>GrowMate Team</Text>
        </View>
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
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginBottom: spacing.lg,
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
    padding: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  settingText: {
    ...typography.bodyLarge,
    color: theme.colors.text,
  },
  settingValue: {
    ...typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  dangerText: {
    color: theme.colors.danger,
  },
});