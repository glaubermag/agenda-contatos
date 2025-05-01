import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '../components/base/BaseModal.vue'

describe('BaseModal', () => {
  const mountModal = (props = {}, slots = {}) => {
    return mount(BaseModal, {
      props: {
        show: true,
        ...props
      },
      slots,
      global: {
        stubs: {
          Teleport: true // Importante: stub do Teleport
        }
      }
    })
  }

  it('should not render when show is false', () => {
    const wrapper = mountModal({ show: false })
    expect(wrapper.find('.modal-content').exists()).toBe(false)
  })

  it('should emit close event on overlay click', async () => {
    const wrapper = mountModal()
    await wrapper.find('.modal-backdrop').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('should emit close event on escape key', async () => {
    const wrapper = mountModal()
    await wrapper.trigger('keydown.esc')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('should render title and content slots', () => {
    const wrapper = mountModal({}, {
      title: 'Título de Teste',
      content: 'Conteúdo de Teste'
    })
    expect(wrapper.find('#modal-title').text()).toBe('Título de Teste')
    expect(wrapper.find('.modal-body').text()).toBe('Conteúdo de Teste')
  })

  it('should maintain visibility when reduce motion is enabled', () => {
    document.documentElement.classList.add('reduce-motion')
    const wrapper = mountModal()
    expect(wrapper.find('.modal-content').exists()).toBe(true)
    document.documentElement.classList.remove('reduce-motion')
  })
})