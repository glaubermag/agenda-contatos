import { defineStore } from 'pinia';
import axios from 'axios';

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
    searchQuery: '',
    loading: false,
    error: null
  }),
  
  getters: {
    filteredContacts: (state) => {
      const query = state.searchQuery.toLowerCase();
      return state.contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query)
      );
    }
  },
  
  actions: {
    async fetchContacts() {
      this.loading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.contacts = response.data;
      } catch (error) {
        this.error = 'Erro ao carregar contatos';
      } finally {
        this.loading = false;
      }
    },
    
    addContact(contact) {
      this.contacts.unshift({
        id: Date.now(),
        ...contact
      });
    }
  }
});