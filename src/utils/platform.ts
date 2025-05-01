import { Capacitor } from '@capacitor/core'

export const isPlatform = {
  mobile: () => Capacitor.getPlatform() !== 'web',
  android: () => Capacitor.getPlatform() === 'android',
  ios: () => Capacitor.getPlatform() === 'ios'
}