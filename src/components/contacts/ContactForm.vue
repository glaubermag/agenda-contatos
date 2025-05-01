<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <BaseInput
      id="name"
      v-model="form.name"
      label="Nome completo"
      required
      :error="errors.name"
      placeholder="Digite o nome completo"
    />

    <BaseInput
      id="email"
      v-model="form.email"
      type="email"
      label="E-mail"
      required
      :error="errors.email"
      placeholder="exemplo@email.com"
    />

    <BaseInput
      id="phone"
      v-model="form.phone"
      type="tel"
      label="Telefone"
      required
      :error="errors.phone"
      placeholder="(00) 00000-0000"
    />

    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
      Adicionar Contato
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContactsStore } from '../../stores/contacts'
import BaseInput from '../base/BaseInput.vue'

const store = useContactsStore()
const form = ref({
  name: '',
  email: '',
  phone: ''
})

const errors = ref({
  name: '',
  email: '',
  phone: ''
})

const validateForm = () => {
  let isValid = true
  errors.value = {
    name: '',
    email: '',
    phone: ''
  }

  if (!form.value.name) {
    errors.value.name = 'Nome é obrigatório'
    isValid = false
  }

  if (!form.value.email) {
    errors.value.email = 'E-mail é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'E-mail inválido'
    isValid = false
  }

  if (!form.value.phone) {
    errors.value.phone = 'Telefone é obrigatório'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    store.addContact(form.value)
    form.value = { name: '', email: '', phone: '' }
  }
}
</script>