import { defineStore } from 'pinia'

import { ref, computed, type Ref } from 'vue'
import type { Contact } from '../types/contact'
import { contactService } from '../services/contactService'

export const useContactsStore = defineStore('contacts', () => {
  const selectedContact: Ref<Contact | null> = ref(null)
  const contacts: Ref<Contact[]> = ref([])
  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)
  const showContactModal = ref(false)
  const showDeleteModal = ref(false)
  const showEditModal = ref(false)
  const showNewContactModal = ref(false)

  // Actions
  const fetchContacts = async () => {
    loading.value = true
    error.value = null
    try {
      contacts.value = await contactService.getAll()
    } catch (err) {
      error.value = 'Failed to fetch contacts'
    } finally {
      loading.value = false
    }
  }

  const createContact = async (contact: Omit<Contact, 'id'>) => {
    loading.value = true
    error.value = null
    try {
      const newContact = await contactService.create(contact)
      contacts.value.push(newContact)
      closeNewContactModal()
    } catch (err) {
      error.value = 'Failed to create contact'
    } finally {
      loading.value = false
    }
  }

  const updateContact = async (id: number, contact: Contact) => {
    loading.value = true
    error.value = null
    try {
      const updatedContact = await contactService.update(id, contact)
      const index = contacts.value.findIndex(c => c.id === id)
      if (index !== -1) {
        contacts.value[index] = updatedContact
      }
      closeEditModal()
    } catch (err) {
      error.value = 'Failed to update contact'
    } finally {
      loading.value = false
    }
  }

  const deleteContact = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await contactService.delete(id)
      contacts.value = contacts.value.filter(c => c.id !== id)
      closeDeleteModal()
    } catch (err) {
      error.value = 'Failed to delete contact'
    } finally {
      loading.value = false
    }
  }

  // Modal actions
  const closeNewContactModal = () => {
    showNewContactModal.value = false
  }

  const closeEditModal = () => {
    selectedContact.value = null
    showEditModal.value = false
  }

  const closeDeleteModal = () => {
    selectedContact.value = null
    showDeleteModal.value = false
  }

  // Add computed property for filtered contacts
  const filteredContacts = computed(() => {
    return contacts.value.filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  // Add missing modal actions
  const openContactDetails = (contact: Contact) => {
    selectedContact.value = contact
    showContactModal.value = true
  }

  const closeContactDetails = () => {
    selectedContact.value = null
    showContactModal.value = false
  }

  const openEditModal = (contact: Contact) => {
    selectedContact.value = contact
    showEditModal.value = true
  }

  const openDeleteModal = (contact: Contact) => {
    selectedContact.value = contact
    showDeleteModal.value = true
  }

  return {
    selectedContact,
    contacts,
    searchQuery,
    loading,
    error,
    showContactModal,
    showDeleteModal,
    showEditModal,
    showNewContactModal,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
    closeNewContactModal,
    closeEditModal,
    closeDeleteModal,
    filteredContacts,
    openContactDetails,
    closeContactDetails,
    openEditModal,
    openDeleteModal
  }
})