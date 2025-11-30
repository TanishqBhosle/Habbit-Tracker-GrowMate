export const lightTheme = {
  colors: {
    primary: '#6366F1', // Indigo
    primaryLight: '#818CF8',
    primaryDark: '#4F46E5',
    success: '#10B981', // Emerald
    successLight: '#34D399',
    warning: '#F59E0B', // Amber
    warningLight: '#FBBF24',
    danger: '#EF4444', // Red
    dangerLight: '#F87171',
    background: '#F9FAFB', // Gray 50
    backgroundSecondary: '#F3F4F6', // Gray 100
    surface: '#FFFFFF', // White
    surfaceSecondary: '#F8FAFC', // Gray 50
    text: '#111827', // Gray 900
    textSecondary: '#6B7280', // Gray 500
    textTertiary: '#9CA3AF', // Gray 400
    border: '#E5E7EB', // Gray 200
    borderDark: '#D1D5DB', // Gray 300
    shadow: 'rgba(0, 0, 0, 0.1)'
  }
};

export const darkTheme = {
  colors: {
    primary: '#818CF8', // Light Indigo
    primaryLight: '#A5B4FC',
    primaryDark: '#6366F1',
    success: '#34D399', // Light Emerald
    successLight: '#6EE7B7',
    warning: '#FBBF24', // Light Amber
    warningLight: '#FCD34D',
    danger: '#F87171', // Light Red
    dangerLight: '#FCA5A5',
    background: '#111827', // Gray 900
    backgroundSecondary: '#1F2937', // Gray 800
    surface: '#1F2937', // Gray 800
    surfaceSecondary: '#374151', // Gray 700
    text: '#F9FAFB', // Gray 50
    textSecondary: '#D1D5DB', // Gray 300
    textTertiary: '#9CA3AF', // Gray 400
    border: '#374151', // Gray 700
    borderDark: '#4B5563', // Gray 600
    shadow: 'rgba(0, 0, 0, 0.3)'
  }
};

export type Theme = typeof lightTheme;