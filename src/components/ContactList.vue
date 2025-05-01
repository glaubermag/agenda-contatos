<template>
  <div class="space-y-6">
    <!-- Campo de busca -->
    <div class="relative">
      <label for="search" class="sr-only">Buscar contatos</label>
      <input
        id="search"
        v-model="store.searchQuery"
        type="search"
        placeholder="Buscar por nome ou email..."
        class="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        aria-label="Campo de busca de contatos"
      />
      <svg
        class="absolute left-3 top-3 h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <!-- Estado de carregamento -->
    <div 
      v-if="store.loading" 
      class="flex justify-center py-8"
      role="status"
      aria-label="Carregando contatos"
    >
      <div 
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
        aria-hidden="true"
      ></div>
      <span class="sr-only">Carregando contatos...</span>
    </div>

    <!-- Lista de contatos -->
    <div 
      v-else 
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Lista de contatos"
    >
      <div
        v-for="contact in store.filteredContacts"
        :key="contact.id"
        class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
        role="listitem"
        tabindex="0"
        @click="openContactDetails(contact)"
        @keydown.enter="openContactDetails(contact)"
        @keydown.space.prevent="openContactDetails(contact)"
        aria-label="Contato: ${contact.name}"
      >
        <div class="flex items-center space-x-4">
          <div class="bg-blue-100 rounded-full p-3">
            <span class="text-blue-600 text-xl font-semibold">
              {{ contact.name.charAt(0) }}
            </span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ contact.name }}</h3>
            <p class="text-gray-600">{{ contact.email }}</p>
            <p class="text-gray-600">{{ contact.phone }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useContactsStore } from '../stores/contacts'

const store = useContactsStore()

onMounted(() => {
  store.fetchContacts()
})
</script>