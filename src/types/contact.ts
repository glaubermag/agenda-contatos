export interface Contact {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface ContactDisplay {
  id: number
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

export function contactToDisplay(contact: Contact): ContactDisplay {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    address: `${contact.address.street}, ${contact.address.suite}`,
    city: contact.address.city,
    state: 'SP', // Valor padrão já que não existe no JSON original
    zipCode: contact.address.zipcode
  }
}

export function displayToContact(display: Omit<ContactDisplay, 'id'>): Partial<Contact> {
  return {
    name: display.name,
    email: display.email,
    phone: display.phone,
    address: {
      street: display.address.split(',')[0],
      suite: display.address.split(',')[1] || '',
      city: display.city,
      zipcode: display.zipCode,
      geo: {
        lat: '0',
        lng: '0'
      }
    }
  }
} 