import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '../components/base/BaseButton.vue'

describe('BaseButton', () => {
  it('renders with correct size class', () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'small' }
    })
    expect(wrapper.classes()).toContain('text-sm')
    expect(wrapper.classes()).toContain('px-3')
    expect(wrapper.classes()).toContain('py-1.5')
  })
  it('should render with default props', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('bg-blue-600')
  })

  it('should render secondary variant', () => {
    const wrapper = mount(BaseButton, {
      props: { variant: 'secondary' }
    })
    expect(wrapper.classes()).toContain('bg-white')
  })

  it('should handle disabled state', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('opacity-50')
  })
})