import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text,
  size = 'large'
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  
  return (
    <View style={styles.container}>
      <ActivityIndicator 
        size={size} 
        color={theme.colors.primary} 
      />
      {text && (
        <Text style={styles.text}>{text}</Text>
      )}
    </View>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  text: {
    ...typography.bodyLarge,
    color: theme.colors.text,
    marginTop: spacing.md,
  },
});