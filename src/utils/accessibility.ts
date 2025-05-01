interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: number;
  reduceMotion: boolean;
}

const STORAGE_KEY = 'accessibility-settings'

export const getStoredSettings = (): AccessibilitySettings => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return {
    highContrast: false,
    fontSize: 100,
    reduceMotion: false
  }

  try {
    const parsed = JSON.parse(stored)
    return {
      highContrast: Boolean(parsed.highContrast),
      fontSize: Number(parsed.fontSize) || 100,
      reduceMotion: Boolean(parsed.reduceMotion)
    }
  } catch {
    return {
      highContrast: false,
      fontSize: 100,
      reduceMotion: false
    }
  }
}

export const saveSettings = (settings: AccessibilitySettings): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}