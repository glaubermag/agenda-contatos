<template>
  <BaseModal :show="show" @close="$emit('close')">
    <template #title>
      Detalhes do Contato
    </template>

    <template #content>
      <div class="space-y-6">
        <!-- Informações básicas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nome</label>
            <input type="text" :value="contact.name" readonly
              class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Nome de usuário</label>
            <input type="text" :value="contact.username" readonly
              class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" :value="contact.email" readonly
              class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Telefone</label>
            <input type="tel" :value="contact.phone" readonly
              class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Website</label>
            <input type="text" :value="contact.website" readonly
              class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
          </div>
        </div>

        <!-- Endereço -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Endereço</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Rua</label>
              <input type="text" :value="contact.address.street" readonly
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Complemento</label>
              <input type="text" :value="contact.address.suite" readonly
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Cidade</label>
              <input type="text" :value="contact.address.city" readonly
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">CEP</label>
              <input type="text" :value="contact.address.zipcode" readonly
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
            </div>
          </div>
        </div>

        <!-- Empresa -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Empresa</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Nome da Empresa</label>
              <input type="text" :value="contact.company.name" readonly
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Slogan</label>
              <input type="text" :value="contact.company.catchPhrase" readonly
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">BS</label>
              <input type="text" :value="contact.company.bs" readonly
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-default" />
            </div>
          </div>
        </div>


      </div>

    </template>

    <template #footer>
      <div class="w-full flex justify-end px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Fechar
        </button>
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