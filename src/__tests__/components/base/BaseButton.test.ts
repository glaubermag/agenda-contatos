import { mount } from '@vue/test-utils'
import BaseButton from '@/components/base/BaseButton.vue'

describe('BaseButton', () => {
  test('deve renderizar o botão com props padrão', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('bg-blue-600')
  })

  test('deve aplicar classes corretas para variante secondary', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'secondary'
      }
    })
    expect(wrapper.classes()).toContain('bg-white')
    expect(wrapper.classes()).toContain('text-gray-700')
  })

  test('deve aplicar classes corretas para tamanho small', () => {
    const wrapper = mount(BaseButton, {
      props: {
        size: 'sm'
      }
    })
    expect(wrapper.classes()).toContain('px-3')
    expect(wrapper.classes()).toContain('py-1.5')
    expect(wrapper.classes()).toContain('text-sm')
  })

  test('deve desabilitar o botão corretamente', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.attributes('disabled')).toBe('')
    expect(wrapper.classes()).toContain('opacity-50')
    expect(wrapper.classes()).toContain('cursor-not-allowed')
  })

  test('deve renderizar slots corretamente', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Texto do Botão',
        'icon-left': '<span>Ícone Esquerdo</span>',
        'icon-right': '<span>Ícone Direito</span>'
      }
    })
    expect(wrapper.text()).toContain('Texto do Botão')
    expect(wrapper.html()).toContain('<span>Ícone Esquerdo</span>')
    expect(wrapper.html()).toContain('<span>Ícone Direito</span>')
  })
})