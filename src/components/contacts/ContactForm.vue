<template>
  <BaseModal :show="show" @close="$emit('close')">
    <template #title>
      {{ contact ? 'Editar Contato' : 'Novo Contato' }}
    </template>
    
    <template #content>
      <!-- Conteúdo do formulário -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Grid para informações básicas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Nome de usuário</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Telefone</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div class="md:col-span-2">
            <label for="website" class="block text-sm font-medium text-gray-700">Website</label>
            <input
              id="website"
              :value="form.website"
              type="text"
              pattern="^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$"
              @input="handleWebsiteInput"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Grid para endereço -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Endereço</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="street" class="block text-sm font-medium text-gray-700">Rua</label>
              <input
                id="street"
                v-model="form.address.street"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="suite" class="block text-sm font-medium text-gray-700">Complemento</label>
              <input
                id="suite"
                v-model="form.address.suite"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                id="city"
                v-model="form.address.city"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="zipcode" class="block text-sm font-medium text-gray-700">CEP</label>
              <input
                id="zipcode"
                v-model="form.address.zipcode"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Grid para empresa -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Empresa</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label for="companyName" class="block text-sm font-medium text-gray-700">Nome da Empresa</label>
              <input
                id="companyName"
                v-model="form.company.name"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="catchPhrase" class="block text-sm font-medium text-gray-700">Slogan</label>
              <input
                id="catchPhrase"
                v-model="form.company.catchPhrase"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label for="bs" class="block text-sm font-medium text-gray-700">BS</label>
              <input
                id="bs"
                v-model="form.company.bs"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

     </form>
    </template>
    
    <template #footer>
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="button"
          @click="handleSubmit"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ contact ? 'Salvar' : 'Criar' }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Contact } from '../../types/contact'
import BaseModal from '../base/BaseModal.vue'

const props = defineProps<{
  show: boolean
  contact?: Contact
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', contact: Contact | Omit<Contact, 'id'>): void
}>()

const emptyForm = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '0',
      lng: '0'
    }
  },
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  }
}

const form = ref({ ...emptyForm })

// Observa mudanças no contato e atualiza o formulário
watch(() => props.contact, (newContact) => {
  if (newContact) {
    form.value = { ...newContact }
  } else {
    form.value = { ...emptyForm }
  }
}, { immediate: true })

const handleWebsiteInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.trim()
  
  if (value && !value.match(/^https?:\/\//)) {
    value = 'https://' + value
  }
  
  form.value.website = value
}

const handleSubmit = () => {
  emit('save', props.contact ? { ...form.value, id: props.contact.id } : form.value)
}
</script>