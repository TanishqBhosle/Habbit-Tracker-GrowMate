import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

export class StorageService {
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
    }
  }

  static async getAllHabits(): Promise<any[] | null> {
    return this.getItem(STORAGE_KEYS.HABITS);
  }

  static async saveHabits(habits: any[]): Promise<void> {
    return this.setItem(STORAGE_KEYS.HABITS, habits);
  }

  static async getSettings(): Promise<any | null> {
    return this.getItem(STORAGE_KEYS.SETTINGS);
  }

  static async saveSettings(settings: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.SETTINGS, settings);
  }

  static async getNotifications(): Promise<any | null> {
    return this.getItem(STORAGE_KEYS.NOTIFICATIONS);
  }

  static async saveNotifications(notifications: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }

  static async getAnalytics(): Promise<any | null> {
    return this.getItem(STORAGE_KEYS.ANALYTICS);
  }

  static async saveAnalytics(analytics: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.ANALYTICS, analytics);
  }
}