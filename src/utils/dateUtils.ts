export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getCurrentDate = (): string => {
  return formatDate(new Date());
};

export const getYesterdayDate = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return formatDate(yesterday);
};

export const isConsecutiveDay = (lastDate: string, currentDate: string): boolean => {
  const last = new Date(lastDate);
  const current = new Date(currentDate);
  last.setDate(last.getDate() + 1);
  return last.toDateString() === current.toDateString();
};

export const getStartOfWeek = (date: Date): Date => {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  newDate.setDate(diff);
  return newDate;
};

export const getWeekDates = (startDate: Date): string[] => {
  const dates = [];
  const current = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    dates.push(formatDate(new Date(current)));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};