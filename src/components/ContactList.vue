<template>
  <div class="space-y-6">
    <!-- Cabeçalho com busca e botão novo contato -->
    <div class="flex justify-between items-center mb-6">
      <div class="w-full flex justify-center">
        <div class="relative w-full">
          <label for="search" class="sr-only">Buscar contatos</label>
          <input
            id="search"
            v-model="store.searchQuery"
            type="search"
            placeholder="Buscar por nome, email ou telefone..."
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
      </div>
      

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

    <!-- Mensagem de erro -->
    <div
      v-if="store.error"
      class="bg-red-50 border-l-4 border-red-400 p-4"
      role="alert"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">
            {{ store.error }}
          </p>
        </div>
      </div>
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
        class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
        role="listitem"
      >
        <div class="flex items-start justify-between">
          <div 
            class="flex items-center space-x-4 cursor-pointer"
            @click="store.openContactDetails(contact)"
            tabindex="0"
            @keydown.enter="store.openContactDetails(contact)"
            @keydown.space.prevent="store.openContactDetails(contact)"
          >
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
          
          <!-- Botões de ação -->
          <div class="flex space-x-2">
            <button
              @click.stop.prevent="store.openEditModal(contact)"
              class="p-2 text-gray-400 hover:text-blue-500 focus:outline-none focus:text-blue-500"
              aria-label="Editar contato"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              @click.stop.prevent="store.openDeleteModal(contact)"
              class="p-2 text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500"
              aria-label="Excluir contato"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- Modais -->
    <ContactDetails
      v-if="store.selectedContact && store.showContactModal"
      :contact="store.selectedContact"
      :show="store.showContactModal"
      @close="store.closeContactDetails"
    />

    <ContactForm
      v-if="store.showEditModal"
      :contact="store.selectedContact"
      :show="store.showEditModal"
      @close="store.closeEditModal"
      @save="handleEditContact"
    />

    <ContactForm
      v-if="store.showNewContactModal"
      :show="store.showNewContactModal"
      @close="store.closeNewContactModal"
      @save="handleNewContact"
    />

    <DeleteConfirmation
      v-if="store.showDeleteModal && store.selectedContact"
      :contact="store.selectedContact"
      :show="store.showDeleteModal"
      @close="store.closeDeleteModal"
      @confirm="handleDeleteContact"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContactsStore } from '../stores/contacts'
import type { Contact } from '../types/contact'
import ContactDetails from './contacts/ContactDetails.vue'
import ContactForm from './contacts/ContactForm.vue'
import DeleteConfirmation from './contacts/DeleteConfirmation.vue'

const store = useContactsStore()

onMounted(() => {
  store.fetchContacts()
})

const handleNewContact = async (contact: Omit<Contact, 'id'>) => {
  try {
    await store.createContact(contact)
    store.closeNewContactModal()
  } catch (error) {
    // Erro já tratado na store
  }
}

const handleEditContact = async (contact: Contact | Omit<Contact, 'id'>) => {
  try {
    if ('id' in contact) {
      await store.updateContact(contact.id, contact)
      store.closeEditModal()
    }
  } catch (error) {
    // Erro já tratado na store
  }
}

const handleDeleteContact = async () => {
  const contactToDelete = store.selectedContact
  if (contactToDelete && 'id' in contactToDelete) {
    try {
      await store.deleteContact(contactToDelete.id)
      store.closeDeleteModal()
    } catch (error) {
      // Erro já tratado na store
    }
  }
}
</script>