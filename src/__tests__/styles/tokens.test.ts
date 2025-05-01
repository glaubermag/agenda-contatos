import { tokens } from '@/styles/tokens'

describe('Tokens', () => {
  test('deve ter as cores primárias corretas', () => {
    expect(tokens.colors.primary).toEqual({
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8'
    })
  })

  test('deve ter as cores cinza corretas', () => {
    expect(tokens.colors.gray).toEqual({
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      700: '#374151',
      900: '#111827'
    })
  })

  test('deve ter os espaçamentos corretos', () => {
    expect(tokens.spacing).toEqual({
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    })
  })

  test('deve ter as configurações de animação corretas', () => {
    expect(tokens.animation.transition).toEqual({
      fast: '150ms',
      default: '300ms',
      slow: '500ms'
    })
    expect(tokens.animation.easing).toEqual({
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    })
  })
})