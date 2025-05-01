interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: number;
  reduceMotion: boolean;
}

const STORAGE_KEY = 'accessibility-settings'

export const getStoredSettings = (): AccessibilitySettings => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : {
    highContrast: false,
    fontSize: 100,
    reduceMotion: false
  }
}

export const saveSettings = (settings: AccessibilitySettings): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}