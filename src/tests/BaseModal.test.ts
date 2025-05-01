import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '../components/base/BaseModal.vue'

describe('BaseModal', () => {
  it('should not render when show is false', () => {
    const wrapper = mount(BaseModal, {
      props: {
        show: false
      }
    })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('should emit close event on overlay click', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        show: true
      }
    })
    await wrapper.find('[aria-hidden="true"]').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should emit close event on escape key', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        show: true
      }
    })
    
    // Find the modal dialog and trigger keydown on it
    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.exists()).toBe(true)
    await dialog.trigger('keydown.esc')
    
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should render title and content slots', () => {
    const wrapper = mount(BaseModal, {
      props: {
        show: true
      },
      slots: {
        title: 'Modal Title',
        content: 'Modal Content'
      }
    })
    expect(wrapper.find('#modal-title').text()).toBe('Modal Title')
    expect(wrapper.text()).toContain('Modal Content')
  })
})