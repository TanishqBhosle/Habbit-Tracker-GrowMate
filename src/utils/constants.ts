export const STORAGE_KEYS = {
  HABITS: '@growmate_habits',
  SETTINGS: '@growmate_settings',
  NOTIFICATIONS: '@growmate_notifications',
  ANALYTICS: '@growmate_analytics'
};

export const HABIT_CATEGORIES = [
  { id: 'health', label: 'Health', icon: 'heart' },
  { id: 'productivity', label: 'Productivity', icon: 'briefcase' },
  { id: 'mindfulness', label: 'Mindfulness', icon: 'leaf' },
  { id: 'fitness', label: 'Fitness', icon: 'run' },
  { id: 'learning', label: 'Learning', icon: 'book' },
  { id: 'custom', label: 'Custom', icon: 'plus' }
];

export const HABIT_COLORS = [
  '#6366F1', // indigo
  '#10B981', // emerald
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#0EA5E9', // sky
  '#14B8A6', // teal
];

export const HABIT_FREQUENCIES = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'custom', label: 'Custom' }
];