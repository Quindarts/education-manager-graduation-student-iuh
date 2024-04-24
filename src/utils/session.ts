export const setValueInSession = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};
export const removeValueInSession = (key: string) => {
  sessionStorage.removeItem(key);
};

export const getValueFromSession = (key: string) => {
  const value = sessionStorage.getItem(key) || '';
  return value;
};
