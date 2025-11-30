import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { useHabitStore } from '../store/habitStore';
import { NotificationService } from '../services/notificationService';
import { Habit } from '../store/habitStore';

// Check if we're running in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

export const SettingsScreen: React.FC = () => {
  const { habits, deleteHabit } = useHabitStore();
  const { theme } = useTheme();
  
  // Ensure habits is always an array
  const safeHabits = Array.isArray(habits) ? habits : [];
  
  const styles = getStyles(theme);

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
              // Cancel all notifications if not in Expo Go
              if (!isExpoGo) {
                await NotificationService.cancelAllReminders();
              }
              
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
    if (isExpoGo) {
      Alert.alert(
        'Notifications Not Available',
        'Push notifications are not available in Expo Go. Use a development build to test notifications.',
        [{ text: 'OK' }]
      );
      return;
    }
    
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

const getStyles = (theme: any) => StyleSheet.create({
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
    borderRadius: 16,
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
  sectionTitle: {
    ...typography.h2,
    color: theme.colors.text,
    padding: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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