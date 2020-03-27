'use strict'

export const getData = async (url, axios) => {
  const response = await axios.get(url)
  return {
    data: response.data.data,
    included: response.data.included
  }
}

export const deserializeContacts = (contacts) => {
  contacts.forEach((c) => {
    if (c.relationships) {
      c.attributes.tag_ids = c.relationships.tags.data.map(t => t.id)
    }
    c.attributes.id = c.id
    if (c.attributes.born) {
      c.attributes.born = new Date(c.attributes.born)
    }
  })
}

export const deserializeTags = (tags) => {
  tags.forEach((t) => {
    t.attributes.id = t.id
    t.attributes.contact_ids = t.relationships.contacts.data.map(c => c.id)
  })
}
