export function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getFromStorage(key, defaultValue) {
  return localStorage.getItem(key) ?? defaultValue;
}
