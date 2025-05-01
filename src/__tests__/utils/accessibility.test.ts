import { getStoredSettings, saveSettings } from '@/utils/accessibility'

describe('Utilitários de Acessibilidade', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('deve retornar configurações padrão quando não há dados salvos', () => {
    const settings = getStoredSettings()
    expect(settings).toEqual({
      highContrast: false,
      fontSize: 100,
      reduceMotion: false
    })
  })

  test('deve salvar e recuperar configurações corretamente', () => {
    const testSettings = {
      highContrast: true,
      fontSize: 120,
      reduceMotion: true
    }
    
    saveSettings(testSettings)
    const savedSettings = getStoredSettings()
    expect(savedSettings).toEqual(testSettings)
  })

  test('deve lidar com dados inválidos no localStorage', () => {
    localStorage.setItem('accessibility-settings', 'invalid-json')
    const settings = getStoredSettings()
    expect(settings).toEqual({
      highContrast: false,
      fontSize: 100,
      reduceMotion: false
    })
  })
})