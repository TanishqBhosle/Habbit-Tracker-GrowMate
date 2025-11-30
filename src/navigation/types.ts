export type RootStackParamList = {
  Home: undefined;
  AddHabit: undefined;
  EditHabit: { habitId: string };
  HabitDetail: { habitId: string };
  Insights: undefined;
  Settings: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  InsightsTab: undefined;
  SettingsTab: undefined;
};