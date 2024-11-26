export const formatDates = (date: string, option?: string) => {
  const data = new Date(date);
  if (date === '')
    return '';
  if (option === 'datetime') {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(
      data,
    );
  }
  if (option === 'date') {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(data);
  }
  return new Intl.DateTimeFormat('en-US').format(data);
};
