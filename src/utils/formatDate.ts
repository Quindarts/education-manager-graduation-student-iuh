export const formatDates = (date: string, option?: string) => {
  const data = new Date(date);
  if (option === 'datetime') {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(
      data,
    );
  }
  if (option === 'date') {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(data);
  }
  return new Intl.DateTimeFormat('en-US').format(data);
};
