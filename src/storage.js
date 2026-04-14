const KEY = "rt_v1";

export function loadData() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { contacts: [], interactions: [] };
  } catch {
    return { contacts: [], interactions: [] };
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // storage unavailable
  }
}
