import React from 'react';
import Constants from 'expo-constants';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useNotifications } from './src/hooks/useNotifications';
import { useStreaks } from './src/hooks/useStreaks';
import { ThemeProvider } from './src/theme/ThemeContext';

// Check if we're running in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

export default function App() {
  // Only use notifications if not in Expo Go
  if (!isExpoGo) {
    useNotifications();
  }
  useStreaks();
  
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}