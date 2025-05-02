import type { Contact } from '../types/contact'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://glaubermag.dev.br/test/agenda/api.php',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const contactService = {
  async getAll(): Promise<Contact[]> {
    const { data } = await api.get<Contact[]>('/contacts')
    return data
  },

  async getById(id: number): Promise<Contact> {
    const { data } = await api.get<Contact>(`/contacts/${id}`)
    return data
  },

  async create(contact: Omit<Contact, 'id'>): Promise<Contact> {
    const { data } = await api.post<Contact>('/contacts', contact)
    return data
  },

  async update(id: number, contact: Partial<Contact>): Promise<Contact> {
    // Garantir que o ID seja um número e enviar todos os dados necessários
    const { data } = await api.put<Contact>(`/contacts/${Number(id)}`, {
      ...contact,
      id: Number(id)
    })
    return data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/contacts/${id}`)
  }
}