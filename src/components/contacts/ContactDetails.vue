<template>
  <BaseModal :show="show" @close="$emit('close')">
    <template #title>
      Detalhes do Contato
    </template>
    
    <template #content>
      <div class="space-y-6">
        <!-- Informações básicas -->
        <div>
          <h4 class="text-sm font-medium text-gray-500">Informações Básicas</h4>
          <dl class="mt-2 space-y-3">
            <div>
              <dt class="text-sm font-medium text-gray-500">Nome</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ contact.name }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Nome de usuário</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ contact.username }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-gray-900">
                <a :href="'mailto:' + contact.email" class="text-blue-600 hover:text-blue-800">
                  {{ contact.email }}
                </a>
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Telefone</dt>
              <dd class="mt-1 text-sm text-gray-900">
                <a :href="'tel:' + contact.phone" class="text-blue-600 hover:text-blue-800">
                  {{ contact.phone }}
                </a>
              </dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Website</dt>
              <dd class="mt-1 text-sm text-gray-900">
                <a :href="contact.website.startsWith('http') ? contact.website : 'https://' + contact.website" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-blue-600 hover:text-blue-800"
                >
                  {{ contact.website }}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <!-- Endereço -->
        <div>
          <h4 class="text-sm font-medium text-gray-500">Endereço</h4>
          <dl class="mt-2 space-y-3">
            <div>
              <dt class="text-sm font-medium text-gray-500">Rua</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ contact.address.street }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Complemento</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ contact.address.suite }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Cidade</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ contact.address.city }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">CEP</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ contact.address.zipcode }}</dd>
            </div>
          </dl>
        </div>

        <!-- Empresa -->
        <div>
          <h4 class="text-sm font-medium text-gray-500">Empresa</h4>
          <dl class="mt-2 space-y-3">
            <div>
              <dt class="text-sm font-medium text-gray-500">Nome</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ contact.company.name }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Slogan</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ contact.company.catchPhrase }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">BS</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ contact.company.bs }}</dd>
            </div>
          </dl>
        </div>

        <!-- Botões -->
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Contact } from '../../types/contact'
import BaseModal from '../base/BaseModal.vue'

defineProps<{
  show: boolean
  contact: Contact
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script> 