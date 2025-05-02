import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccessibilityStore = defineStore('accessibility', () => {
  // Recupera as configurações do localStorage ou usa os valores padrão
  const screenReaderEnabled = ref(localStorage.getItem('screenReaderEnabled') !== 'false')
  const highContrastEnabled = ref(localStorage.getItem('highContrastEnabled') === 'true')
  
  // Função para alternar o suporte a screen reader
  function toggleScreenReader() {
    screenReaderEnabled.value = !screenReaderEnabled.value
    localStorage.setItem('screenReaderEnabled', screenReaderEnabled.value.toString())
    
    // Atualiza o atributo aria-hidden no documento
    if (!screenReaderEnabled.value) {
      document.documentElement.setAttribute('aria-hidden', 'true')
    } else {
      document.documentElement.removeAttribute('aria-hidden')
    }
  }
  
  // Função para alternar o modo de alto contraste
  function toggleHighContrast() {
    highContrastEnabled.value = !highContrastEnabled.value
    localStorage.setItem('highContrastEnabled', highContrastEnabled.value.toString())
    
    // Adiciona ou remove a classe de alto contraste no elemento raiz
    if (highContrastEnabled.value) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }
  
  // Inicializa as configurações quando a store é criada
  function initAccessibilitySettings() {
    if (!screenReaderEnabled.value) {
      document.documentElement.setAttribute('aria-hidden', 'true')
    }
    
    if (highContrastEnabled.value) {
      document.documentElement.classList.add('high-contrast')
    }
  }
  
  // Chama a inicialização
  initAccessibilitySettings()
  
  return { 
    screenReaderEnabled, 
    highContrastEnabled, 
    toggleScreenReader, 
    toggleHighContrast 
  }
})