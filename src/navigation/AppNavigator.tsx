import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { AddHabitScreen } from '../screens/AddHabitScreen';
import { EditHabitScreen } from '../screens/EditHabitScreen';
import { HabitDetailScreen } from '../screens/HabitDetailScreen';
import { InsightsScreen } from '../screens/InsightsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { theme } from '../theme/colors';
import { RootStackParamList, TabParamList } from './types';

// Stack Navigator for Home tab
const HomeStack = createStackNavigator<RootStackParamList>();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="AddHabit" component={AddHabitScreen} />
      <HomeStack.Screen name="EditHabit" component={EditHabitScreen} />
      <HomeStack.Screen name="HabitDetail" component={HabitDetailScreen} />
    </HomeStack.Navigator>
  );
};

// Tab Navigator
const Tab = createBottomTabNavigator<TabParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopWidth: 1,
            borderTopColor: theme.colors.background,
          },
        }}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStackNavigator}
          options={{
            title: 'Habits',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>🏠</Text>
            ),
          }}
        />
        <Tab.Screen 
          name="InsightsTab" 
          component={InsightsScreen}
          options={{
            title: 'Insights',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>📊</Text>
            ),
          }}
        />
        <Tab.Screen 
          name="SettingsTab" 
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>⚙️</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};