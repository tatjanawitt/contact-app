'use strict'

import { Server, Model, JSONAPISerializer, hasMany, belongsTo } from 'miragejs'
import _ from 'lodash'
import contactsJSON from '@/data/contacts.json'
import tagsJSON from '@/data/tags.json'
import usersJSON from '@/data/users.json'

const BaseSerializer = JSONAPISerializer.extend({
  keyForAttribute (attr) {
    return _.camelCase(attr)
  }
})
const renameObjKey = (obj, oldKey, newKey) => {
  obj[newKey] = obj[oldKey]
  delete obj[oldKey]
}
/* eslint-disable no-new */
new Server({
  fixtures: {
    contacts: contactsJSON,
    tags: tagsJSON,
    users: usersJSON
  },
  models: {
    contact: Model.extend({
      tags: hasMany(),
      user: belongsTo()
    }),
    tag: Model.extend({
      contacts: hasMany()
    }),
    user: Model.extend({
      contacts: hasMany()
    })
  },
  serializers: {
    application: BaseSerializer,
    tag: BaseSerializer.extend({
      include: ['contacts'],
      normalize (json) {
        return {
          data: {
            type: 'tag',
            attributes: json
          }
        }
      }
    }),
    contact: BaseSerializer.extend({
      include: ['tags', 'user'],
      normalize (json) {
        return {
          data: {
            type: 'contact',
            attributes: json
          }
        }
      }
    }),
    user: BaseSerializer.extend({
      include: ['contacts'],
      normalize (json) {
        return {
          data: {
            type: 'user',
            attributes: json
          }
        }
      }
    })
  },
  routes () {
    // this.post('https://vue-screencasts-uploads.s3-us-west-2.amazonaws.com', (schema, request) => {
    //   return new Response(201)
    // })
    this.namespace = 'api'
    this.urlPrefix = 'http://localhost:3000'

    this.get('/contacts')
    this.post('/contacts')
    this.put('/contacts/:id')
    this.delete('/contacts/:id')
    this.get('/contacts/user/:userId', (schema, request) => {
      const userId = request.params.userId + ''
      return schema.contacts.where({ userId })
    })

    this.get('/tags')
    this.post('/tags')
    this.put('/tags/:id')
    this.delete('/tags/:id')

    this.post('/contact_tags', (schema, request) => {
      const { contact, tag } = JSON.parse(request.requestBody)

      contact.tag_ids.push(tag.id)
      renameObjKey(contact, 'tag_ids', 'tagIds')
      renameObjKey(contact, 'user_id', 'userId')
      schema.db.contacts.update(contact.id, contact)

      tag.contact_ids.push(contact.id)
      renameObjKey(tag, 'contact_ids', 'contactIds')
      schema.db.tags.update(tag.id, tag)
      return new Response(201)
    })

    this.post('/contact_tags/delete', (schema, request) => {
      const { contact, tag } = JSON.parse(request.requestBody)

      contact.tagIds = contact.tag_ids.filter(tId => tId !== tag.id)
      delete contact.tag_ids
      renameObjKey(contact, 'user_id', 'userId')
      schema.db.contacts.update(contact.id, contact)

      tag.contactIds = tag.contact_ids.filter(cId => cId !== contact.id)
      delete tag.contact_ids
      schema.db.tags.update(tag.id, tag)
      return new Response(201)
    })

    this.get('/users')
    this.get('/users/:id')
    this.post('/users')
    this.put('/users/:id')
    this.delete('/users/:id')
    this.patch('/users/:id/contacts', () => new Response(201))

    // Nuxt Auth endpoints
    this.post('/sessions', (schema, request) => {
      const json = JSON.parse(request.requestBody)
      const response = schema.users.findBy({ email: json.email })
      if (json.password === 'aaaaaaaa') { // your actual backend should test the hashed password in the DB
        return { token: response.attrs.token }
      } else {
        return new Response(401)
      }
    })
    this.get('/sessions/user', function (schema, request) {
      const token = request.requestHeaders.Authorization
      const response = schema.users.findBy({ token })
      const user = this.serialize(response)
      user.data.attributes.id = user.data.id
      return user
    })
  }
})
