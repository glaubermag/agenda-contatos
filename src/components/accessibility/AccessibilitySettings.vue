<template>
  <div>
    <!-- Botão de acessibilidade com atalho de teclado -->
    <button
      @click="showModal = true"
      @keydown.alt.a="showModal = true"
      class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label="Configurações de acessibilidade (Alt + A)"
      title="Pressione Alt + A para abrir as configurações de acessibilidade"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      <span>Acessibilidade</span>
    </button>

    <!-- Modal com melhorias de acessibilidade -->
    <BaseModal 
      :show="showModal" 
      @close="handleClose"
      @keydown.esc="handleClose"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <h2 id="accessibility-title" class="text-xl font-semibold">
            Configurações de Acessibilidade
          </h2>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-gray-500"
            aria-label="Fechar configurações de acessibilidade"
          >
            <span class="sr-only">Fechar</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </template>
      
      <template #content>
        <div 
          class="space-y-6"
          role="group"
          aria-labelledby="accessibility-title"
        >
          <!-- Alto Contraste com feedback sonoro -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Alto Contraste</h3>
              <p class="text-sm text-gray-500">
                Aumenta o contraste das cores para melhor visualização
                <span class="sr-only">
                  Pressione Enter para ativar ou desativar
                </span>
              </p>
            </div>
            <button
              @click="toggleHighContrast"
              @keydown.enter="toggleHighContrast"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                highContrast ? 'bg-blue-600' : 'bg-gray-200'
              ]"
              role="switch"
              :aria-checked="highContrast"
              aria-label="Alternar alto contraste"
            >
              <span class="sr-only">
                {{ highContrast ? 'Desativar' : 'Ativar' }} alto contraste
              </span>
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  highContrast ? 'translate-x-5' : 'translate-x-0'
                ]"
                aria-hidden="true"
              />
            </button>
          </div>

          <!-- Controles de fonte com feedback -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Tamanho da Fonte</h3>
            <div class="flex items-center space-x-4" role="group" aria-label="Controles de tamanho da fonte">
              <button
                @click="decreaseFontSize"
                class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                aria-label="Diminuir tamanho da fonte"
                :disabled="fontSize <= 80"
              >
                <span aria-hidden="true">A-</span>
              </button>
              <span 
                class="text-lg font-medium"
                role="status"
                aria-live="polite"
              >
                {{ fontSize }}%
              </span>
              <button
                @click="increaseFontSize"
                class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                aria-label="Aumentar tamanho da fonte"
                :disabled="fontSize >= 150"
              >
                <span aria-hidden="true">A+</span>
              </button>
            </div>
          </div>

          <!-- Redução de movimento com feedback -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Reduzir Animações</h3>
              <p class="text-sm text-gray-500">
                Remove animações e transições
                <span class="sr-only">
                  Pressione Enter para ativar ou desativar
                </span>
              </p>
            </div>
            <button
              @click="toggleReduceMotion"
              @keydown.enter="toggleReduceMotion"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                reduceMotion ? 'bg-blue-600' : 'bg-gray-200'
              ]"
              role="switch"
              :aria-checked="reduceMotion"
              aria-label="Alternar redução de movimento"
            >
              <span class="sr-only">
                {{ reduceMotion ? 'Desativar' : 'Ativar' }} redução de movimento
              </span>
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  reduceMotion ? 'translate-x-5' : 'translate-x-0'
                ]"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import BaseModal from '../base/BaseModal.vue'
import { getStoredSettings, saveSettings } from '../../utils/accessibility'

const showModal = ref(false)
const highContrast = ref(false)
const fontSize = ref(100)
const reduceMotion = ref(false)

// Add the missing handleClose method
const handleClose = () => {
  showModal.value = false
}

// Carrega as configurações salvas
onMounted(() => {
  const settings = getStoredSettings()
  highContrast.value = settings.highContrast
  fontSize.value = settings.fontSize
  reduceMotion.value = settings.reduceMotion
  
  // Aplica as configurações imediatamente
  applySettings()
})

// Funções para controle de fonte
const increaseFontSize = () => {
  if (fontSize.value < 150) {
    fontSize.value += 10
    saveCurrentSettings()
  }
}

const decreaseFontSize = () => {
  if (fontSize.value > 80) {
    fontSize.value -= 10
    saveCurrentSettings()
  }
}

// Toggle alto contraste
const toggleHighContrast = () => {
  highContrast.value = !highContrast.value
  saveCurrentSettings()
}

// Toggle redução de movimento
const toggleReduceMotion = () => {
  reduceMotion.value = !reduceMotion.value
  saveCurrentSettings()
}

// Salva as configurações atuais
const saveCurrentSettings = () => {
  saveSettings({
    highContrast: highContrast.value,
    fontSize: fontSize.value,
    reduceMotion: reduceMotion.value
  })
}

// Aplica as configurações ao DOM
const applySettings = () => {
  // Alto contraste
  document.documentElement.classList.toggle('high-contrast', highContrast.value)
  
  // Tamanho da fonte
  document.documentElement.style.fontSize = `${fontSize.value}%`
  
  // Redução de movimento
  document.documentElement.classList.toggle('reduce-motion', reduceMotion.value)
}

// Observa mudanças e aplica as configurações
watch([highContrast, fontSize, reduceMotion], () => {
  applySettings()
})
</script>