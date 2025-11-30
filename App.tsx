import React from 'react';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useNotifications } from './src/hooks/useNotifications';
import { useStreaks } from './src/hooks/useStreaks';

export default function App() {
  useNotifications();
  useStreaks();
  
  return <AppNavigator />;
}