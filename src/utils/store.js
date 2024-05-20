export function getLocalStorage(key) {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(key);
    try {
      if (value) {
        return JSON.parse(value);
      }
    } catch (e) {
      // handle error
    }
    return value;
  }
  return null;
}
