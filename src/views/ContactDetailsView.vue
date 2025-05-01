<template>
  <div class="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
    <div v-if="contact" class="space-y-4">
      <div class="flex items-center space-x-4">
        <div class="bg-blue-100 rounded-full p-6">
          <span class="text-blue-600 text-3xl font-semibold">
            {{ contact.name.charAt(0) }}
          </span>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ contact.name }}</h1>
          <p class="text-gray-600">{{ contact.email }}</p>
          <p class="text-gray-600">{{ contact.phone }}</p>
        </div>
      </div>

      <div class="mt-6 border-t pt-4">
        <h2 class="text-lg font-semibold mb-2">Informações Adicionais</h2>
        <p><strong>Empresa:</strong> {{ contact.company?.name }}</p>
        <p><strong>Website:</strong> {{ contact.website }}</p>
        <p><strong>Endereço:</strong> {{ formatAddress(contact.address) }}</p>
      </div>

      <button
        @click="router.back()"
        class="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Voltar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactsStore } from '../stores/contacts'

const route = useRoute()
const router = useRouter()
const store = useContactsStore()

const contact = computed(() => {
  return store.contacts.find(c => c.id.toString() === route.params.id)
})

const formatAddress = (address: any) => {
  if (!address) return ''
  return `${address.street}, ${address.suite}, ${address.city}`
}
</script>