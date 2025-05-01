import { defineStore } from 'pinia'
import type { Contact } from '../types/contact'
import { contactService } from '../services/contactService'

interface ContactsState {
  contacts: Contact[]
  selectedContact: Contact | null
  searchQuery: string
  loading: boolean
  error: string | null
  showContactModal: boolean
  showDeleteModal: boolean
  showEditModal: boolean
  showNewContactModal: boolean
}

export const useContactsStore = defineStore('contacts', {
  state: (): ContactsState => ({
    contacts: [],
    selectedContact: null,
    searchQuery: '',
    loading: false,
    error: null,
    showContactModal: false,
    showDeleteModal: false,
    showEditModal: false,
    showNewContactModal: false
  }),
  
  getters: {
    filteredContacts: (state) => {
      const query = state.searchQuery.toLowerCase()
      return state.contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query)
      )
    }
  },
  
  actions: {
    // Modal actions
    openNewContactModal() {
      this.showNewContactModal = true
    },

    closeNewContactModal() {
      this.showNewContactModal = false
    },

    openContactDetails(contact: Contact) {
      this.selectedContact = contact
      this.showContactModal = true
    },

    closeContactDetails() {
      this.selectedContact = null
      this.showContactModal = false
    },

    openEditModal(contact: Contact) {
      this.selectedContact = contact
      this.showEditModal = true
    },

    closeEditModal() {
      this.selectedContact = null
      this.showEditModal = false
    },

    openDeleteModal(contact: Contact) {
      this.selectedContact = contact
      this.showDeleteModal = true
    },

    closeDeleteModal() {
      this.selectedContact = null
      this.showDeleteModal = false
    },

    // API actions
    async fetchContacts() {
      this.loading = true
      this.error = null
      try {
        this.contacts = await contactService.getAll()
      } catch (error) {
        this.error = 'Erro ao carregar contatos'
        console.error('Erro ao buscar contatos:', error)
      } finally {
        this.loading = false
      }
    },

    async createContact(contact: Omit<Contact, 'id'>) {
      this.loading = true
      this.error = null
      try {
        const newContact = await contactService.create(contact)
        this.contacts.unshift(newContact)
      } catch (error) {
        this.error = 'Erro ao criar contato'
        console.error('Erro ao criar contato:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateContact(id: number, contact: Partial<Contact>) {
      this.loading = true
      this.error = null
      try {
        const updatedContact = await contactService.update(id, contact)
        const index = this.contacts.findIndex(c => c.id === id)
        if (index !== -1) {
          this.contacts[index] = updatedContact
        }
        this.closeEditModal()
      } catch (error) {
        this.error = 'Erro ao atualizar contato'
        console.error('Erro ao atualizar contato:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteContact(id: number) {
      this.loading = true
      this.error = null
      try {
        await contactService.delete(id)
        this.contacts = this.contacts.filter(c => c.id !== id)
        this.closeDeleteModal()
      } catch (error) {
        this.error = 'Erro ao excluir contato'
        console.error('Erro ao excluir contato:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})