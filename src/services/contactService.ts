import type { Contact } from '../types/contact'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const contactService = {
  async getAll(): Promise<Contact[]> {
    const { data } = await api.get<Contact[]>('/users')
    return data
  },

  async getById(id: number): Promise<Contact> {
    const { data } = await api.get<Contact>(`/users/${id}`)
    return data
  },

  async create(contact: Omit<Contact, 'id'>): Promise<Contact> {
    const { data } = await api.post<Contact>('/users', contact)
    return data
  },

  async update(id: number, contact: Partial<Contact>): Promise<Contact> {
    const { data } = await api.patch<Contact>(`/users/${id}`, contact)
    return data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/users/${id}`)
  }
} 