import { defineStore } from 'pinia'
import axios from 'axios'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  website?: string
  company?: {
    name: string
  }
  address?: {
    street: string
    suite: string
    city: string
  }
}

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: [] as Contact[],
    searchQuery: '',
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    filteredContacts: (state) => {
      const query = state.searchQuery.toLowerCase()
      return state.contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query)
      )
    }
  },
  
  actions: {
    async fetchContacts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.contacts = response.data
      } catch (error) {
        this.error = 'Erro ao carregar contatos'
        console.error('Erro ao buscar contatos:', error)
      } finally {
        this.loading = false
      }
    },

    addContact(contact: Omit<Contact, 'id'>) {
      const newContact = {
        id: this.contacts.length + 1,
        ...contact
      }
      this.contacts.unshift(newContact)
    }
  }
})