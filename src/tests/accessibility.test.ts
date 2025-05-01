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
            template: '<div><slot name="title"></slot><slot name="content"></slot></div>'
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
    const button = wrapper.find('button[aria-label="Alternar alto contraste"]')
    expect(button.exists()).toBe(true)
    await button.trigger('click')
    expect(wrapper.vm.highContrast).toBe(true)
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)
  })

  it('should increase font size', async () => {
    const button = wrapper.find('button[aria-label="Aumentar tamanho da fonte"]')
    expect(button.exists()).toBe(true)
    const initialSize = wrapper.vm.fontSize
    await button.trigger('click')
    expect(wrapper.vm.fontSize).toBe(initialSize + 10)
  })

  it('should decrease font size', async () => {
    const button = wrapper.find('button[aria-label="Diminuir tamanho da fonte"]')
    expect(button.exists()).toBe(true)
    const initialSize = wrapper.vm.fontSize
    await button.trigger('click')
    expect(wrapper.vm.fontSize).toBe(initialSize - 10)
  })

  it('should toggle reduce motion', async () => {
    const button = wrapper.find('button[aria-label="Alternar redução de movimento"]')
    expect(button.exists()).toBe(true)
    await button.trigger('click')
    expect(wrapper.vm.reduceMotion).toBe(true)
    expect(document.documentElement.classList.contains('reduce-motion')).toBe(true)
  })

  it('should persist settings in localStorage', async () => {
    await wrapper.vm.toggleHighContrast()
    await wrapper.vm.increaseFontSize()
    await wrapper.vm.toggleReduceMotion()

    const stored = JSON.parse(localStorage.getItem('accessibility-settings') || '{}')
    expect(stored.highContrast).toBe(true)
    expect(stored.fontSize).toBe(110)
    expect(stored.reduceMotion).toBe(true)
  })

  it('should handle keyboard navigation', async () => {
    // First open the modal by clicking the accessibility button
    const accessibilityButton = wrapper.find('button span')
    expect(accessibilityButton.exists()).toBe(true)
    await accessibilityButton.trigger('keydown.alt.a')
    expect(wrapper.vm.showModal).toBe(true)
  })
})