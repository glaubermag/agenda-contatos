import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import AccessibilitySettings from '../components/accessibility/AccessibilitySettings.vue'

describe('AccessibilitySettings', () => {
  let wrapper: VueWrapper<any>
  
  beforeEach(() => {
    localStorage.clear()
    wrapper = mount(AccessibilitySettings)
  })

  afterEach(() => {
    wrapper.unmount()
    document.documentElement.classList.remove('high-contrast', 'reduce-motion')
  })

  it('should initialize with default settings', () => {
    expect(wrapper.vm.highContrast).toBe(false)
    expect(wrapper.vm.fontSize).toBe(100)
    expect(wrapper.vm.reduceMotion).toBe(false)
  })

  it('should toggle high contrast mode', async () => {
    const button = wrapper.find('[data-test="toggle-contrast"]')
    await button.trigger('click')
    expect(wrapper.vm.highContrast).toBe(true)
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)
  })

  it('should maintain high contrast state when toggling reduce motion', async () => {
    const contrastButton = wrapper.find('[data-test="toggle-contrast"]')
    const motionButton = wrapper.find('[data-test="toggle-motion"]')
    
    await contrastButton.trigger('click')
    await motionButton.trigger('click')
    
    expect(wrapper.vm.highContrast).toBe(true)
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)
  })

  it('should maintain modal opacity when toggling reduce motion', async () => {
    const wrapper = mount(AccessibilitySettings)
    await wrapper.find('[data-test="toggle-motion"]').trigger('click')
    const modal = wrapper.find('.modal-content')
    expect(modal.exists()).toBe(true)
  })

  it('should handle keyboard navigation', async () => {
    const wrapper = mount(AccessibilitySettings)
    const button = wrapper.find('[data-test="toggle-contrast"]')
    await button.trigger('keydown.tab')
    expect(document.activeElement).toBe(button.element)
  })

  it('should apply high contrast styles to modal elements', async () => {
    await wrapper.find('[data-test="toggle-contrast"]').trigger('click')
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)
  })

  it('should increase font size', async () => {
    const initialSize = wrapper.vm.fontSize
    await wrapper.find('[data-test="increase-font"]').trigger('click')
    expect(wrapper.vm.fontSize).toBe(initialSize + 10)
  })

  it('should decrease font size', async () => {
    const initialSize = wrapper.vm.fontSize
    await wrapper.find('[data-test="decrease-font"]').trigger('click')
    expect(wrapper.vm.fontSize).toBe(initialSize - 10)
  })

  it('should toggle reduce motion', async () => {
    await wrapper.find('[data-test="toggle-motion"]').trigger('click')
    expect(wrapper.vm.reduceMotion).toBe(true)
    expect(document.documentElement.classList.contains('reduce-motion')).toBe(true)
  })

  it('should persist settings in localStorage', async () => {
    await wrapper.find('[data-test="toggle-contrast"]').trigger('click')
    const settings = localStorage.getItem('accessibility-settings')
    expect(settings && JSON.parse(settings)).toEqual(
      expect.objectContaining({
        highContrast: true
      })
    )
  })

  it('should handle keyboard navigation', async () => {
    await wrapper.trigger('keydown.tab')
    expect(document.activeElement).toBe(wrapper.find('[data-test="toggle-contrast"]').element)
  })
})