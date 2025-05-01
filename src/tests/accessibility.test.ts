import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AccessibilitySettings from '../components/accessibility/AccessibilitySettings.vue'

describe('AccessibilitySettings', () => {
  let wrapper: any

  beforeEach(() => {
    localStorage.clear()
    // Mock BaseModal component to avoid issues with portal/teleport
    wrapper = mount(AccessibilitySettings, {
      global: {
        stubs: {
          BaseModal: {
            template: '<div class="modal-content"><div class="modal-header"><h3 class="modal-title">Test Modal</h3><button class="close">×</button></div><div class="modal-body">Test Content</div><div class="modal-footer">Footer</div></div>'
          }
        }
      }
    })
  })

  it('should initialize with default settings', () => {
    expect(wrapper.vm.highContrast).toBe(false)
    expect(wrapper.vm.fontSize).toBe(100)
    expect(wrapper.vm.reduceMotion).toBe(false)
  })

  it('should toggle high contrast mode', async () => {
    // Primeiro abrir o modal
    await wrapper.find('button').trigger('click')
    
    // Encontrar o botão de alto contraste dentro do modal
    const button = wrapper.find('button[aria-label="Alternar alto contraste"]')
    expect(button.exists()).toBe(true)
    
    await button.trigger('click')
    expect(wrapper.vm.highContrast).toBe(true)
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)
  })

  it('should maintain high contrast state when toggling reduce motion', async () => {
    // Primeiro abrir o modal
    await wrapper.find('button').trigger('click')
    
    // Ativar alto contraste
    const highContrastButton = wrapper.find('button[aria-label="Alternar alto contraste"]')
    await highContrastButton.trigger('click')
    expect(wrapper.vm.highContrast).toBe(true)
    
    // Ativar redução de movimento
    const reduceMotionButton = wrapper.find('button[aria-label="Alternar redução de movimento"]')
    await reduceMotionButton.trigger('click')
    expect(wrapper.vm.reduceMotion).toBe(true)
    
    // Verificar se o alto contraste continua ativo
    expect(wrapper.vm.highContrast).toBe(true)
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)
    
    // Verificar a posição do switch de alto contraste
    const switchIndicator = highContrastButton.find('span[aria-hidden="true"]')
    expect(switchIndicator.classes()).toContain('translate-x-5')
  })

  it('should maintain modal opacity when toggling reduce motion', async () => {
    // Primeiro abrir o modal
    await wrapper.find('button').trigger('click')
    
    // Ativar alto contraste
    const highContrastButton = wrapper.find('button[aria-label="Alternar alto contraste"]')
    await highContrastButton.trigger('click')
    
    // Ativar redução de movimento
    const reduceMotionButton = wrapper.find('button[aria-label="Alternar redução de movimento"]')
    await reduceMotionButton.trigger('click')
    
    // Verificar a opacidade do modal
    const modal = wrapper.find('.modal-content')
    const computedStyle = window.getComputedStyle(modal.element)
    expect(computedStyle.opacity).toBe('1')
    
    // Verificar a opacidade do backdrop
    const backdrop = document.querySelector('.modal-backdrop')
    if (backdrop) {
      const backdropStyle = window.getComputedStyle(backdrop)
      expect(backdropStyle.backgroundColor).toBe('rgba(0, 0, 0, 0.9)')
    }
  })

  it('should apply high contrast styles to modal elements', async () => {
    // Primeiro abrir o modal
    await wrapper.find('button').trigger('click')
    
    // Ativar modo de alto contraste
    const highContrastButton = wrapper.find('button[aria-label="Alternar alto contraste"]')
    await highContrastButton.trigger('click')
    
    // Verificar se o modal tem as classes corretas
    const modal = wrapper.find('.modal-content')
    expect(modal.exists()).toBe(true)
    
    // Verificar se as cores e estilos foram aplicados corretamente
    const computedStyle = window.getComputedStyle(modal.element)
    expect(computedStyle.backgroundColor).toBe('rgb(51, 51, 51)') // var(--bg-secondary)
    expect(computedStyle.color).toBe('rgb(255, 255, 255)') // var(--text-primary)
    expect(computedStyle.border).toContain('2px solid rgb(255, 255, 255)') // var(--border-color)
    
    // Verificar título do modal
    const modalTitle = wrapper.find('.modal-title')
    expect(modalTitle.exists()).toBe(true)
    expect(window.getComputedStyle(modalTitle.element).color).toBe('rgb(255, 255, 255)')
    
    // Verificar botão de fechar
    const closeButton = wrapper.find('.close')
    expect(closeButton.exists()).toBe(true)
    expect(window.getComputedStyle(closeButton.element).color).toBe('rgb(255, 255, 255)')
    expect(window.getComputedStyle(closeButton.element).opacity).toBe('1')
  })

  it('should increase font size', async () => {
    // Primeiro abrir o modal
    await wrapper.find('button').trigger('click')
    
    const button = wrapper.find('button[aria-label="Aumentar tamanho da fonte"]')
    expect(button.exists()).toBe(true)
    const initialSize = wrapper.vm.fontSize
    await button.trigger('click')
    expect(wrapper.vm.fontSize).toBe(initialSize + 10)
  })

  it('should decrease font size', async () => {
    // Primeiro abrir o modal
    await wrapper.find('button').trigger('click')
    
    const button = wrapper.find('button[aria-label="Diminuir tamanho da fonte"]')
    expect(button.exists()).toBe(true)
    const initialSize = wrapper.vm.fontSize
    await button.trigger('click')
    expect(wrapper.vm.fontSize).toBe(initialSize - 10)
  })

  it('should toggle reduce motion', async () => {
    // Primeiro abrir o modal
    await wrapper.find('button').trigger('click')
    
    const button = wrapper.find('button[aria-label="Alternar redução de movimento"]')
    expect(button.exists()).toBe(true)
    await button.trigger('click')
    expect(wrapper.vm.reduceMotion).toBe(true)
    expect(document.documentElement.classList.contains('reduce-motion')).toBe(true)
  })

  it('should persist settings in localStorage', async () => {
    // Primeiro abrir o modal
    await wrapper.find('button').trigger('click')
    
    const highContrastButton = wrapper.find('button[aria-label="Alternar alto contraste"]')
    await highContrastButton.trigger('click')
    
    const increaseFontButton = wrapper.find('button[aria-label="Aumentar tamanho da fonte"]')
    await increaseFontButton.trigger('click')
    
    const reduceMotionButton = wrapper.find('button[aria-label="Alternar redução de movimento"]')
    await reduceMotionButton.trigger('click')

    const stored = JSON.parse(localStorage.getItem('accessibility-settings') || '{}')
    expect(stored.highContrast).toBe(true)
    expect(stored.fontSize).toBe(110)
    expect(stored.reduceMotion).toBe(true)
  })

  it('should handle keyboard navigation', async () => {
    const accessibilityButton = wrapper.find('button')
    expect(accessibilityButton.exists()).toBe(true)
    await accessibilityButton.trigger('keydown.alt.a')
    expect(wrapper.vm.showModal).toBe(true)
  })
})