export const setValueInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeValueInLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
export const getValueFromLocalStorage = (key: string) => {
  const value: string | null = localStorage.getItem(key);
  return value ? JSON.parse(value) : '';
};
