import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '../../App.vue'

describe('Contacts Integration', () => {
  let wrapper: any

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.style.fontSize = ''
  })

  it('should show accessibility settings when clicking the button', async () => {
    wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
        stubs: {
          'router-view': true,
          'BaseModal': {
            template: '<div><slot name="title"></slot><slot name="content"></slot></div>'
          },
          'AccessibilitySettings': false // Don't stub this component
        }
      }
    })
    
    // First find the accessibility settings component
    const accessibilityComponent = wrapper.findComponent({ name: 'AccessibilitySettings' })
    expect(accessibilityComponent.exists()).toBe(true)
    
    // Then find the button within that component
    const accessibilityButton = accessibilityComponent.find('button')
    expect(accessibilityButton.exists()).toBe(true)
    await accessibilityButton.trigger('click')
    
    // Check if modal is shown
    expect(accessibilityComponent.vm.showModal).toBe(true)
  })

  it('should persist accessibility settings across page reloads', async () => {
    // First set the settings
    const settings = {
      highContrast: true,
      fontSize: 120,
      reduceMotion: true
    }
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))
    
    // Mount component to trigger settings application
    wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
        stubs: {
          'router-view': true,
          BaseModal: {
            template: '<div><slot name="title"></slot><slot name="content"></slot></div>'
          }
        }
      }
    })
    
    // Wait for next tick to ensure settings are applied
    await wrapper.vm.$nextTick()
    
    // Verify settings are applied
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)
    expect(document.documentElement.style.fontSize).toBe('120%')
    expect(document.documentElement.classList.contains('reduce-motion')).toBe(true)
  })
})