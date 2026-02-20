import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ONBOARDING_COMPLETE: 'onboarding_complete',
  USER_ID: 'user_id',
  LAST_OPEN_DATE: 'last_open_date',
  RECENT_SEARCHES: 'recent_searches',
};

export async function setOnboardingComplete(complete: boolean): Promise<void> {
  await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETE, JSON.stringify(complete));
}

export async function isOnboardingComplete(): Promise<boolean> {
  const value = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETE);
  return value ? JSON.parse(value) : false;
}

export async function setUserId(id: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.USER_ID, id);
}

export async function getUserId(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.USER_ID);
}

export async function addRecentSearch(query: string): Promise<void> {
  const existing = await getRecentSearches();
  const updated = [query, ...existing.filter((s) => s !== query)].slice(0, 10);
  await AsyncStorage.setItem(KEYS.RECENT_SEARCHES, JSON.stringify(updated));
}

export async function getRecentSearches(): Promise<string[]> {
  const value = await AsyncStorage.getItem(KEYS.RECENT_SEARCHES);
  return value ? JSON.parse(value) : [];
}

export async function clearAllData(): Promise<void> {
  await AsyncStorage.clear();
}
