<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nome completo</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
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

    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
    >
      Adicionar Contato
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useContactsStore } from '../stores/contacts';

const store = useContactsStore();
const form = ref({
  name: '',
  email: '',
  phone: ''
});

const handleSubmit = () => {
  store.addContact(form.value);
  form.value = { name: '', email: '', phone: '' };
};
</script>