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
    this.patch('/contacts/:id/rating', (schema, request) => {
      return new Response(201)
    })

    this.get('/tags')
    this.post('/tags')
    this.put('/tags/:id')
    this.delete('/tags/:id')

    this.post('/contact_tags', () => new Response(201))
    this.post('/contact_tags/delete', () => new Response(200))

    this.get('/users')
    this.post('/users')
    this.put('/users/:id')
    this.delete('/users/:id')

    // Nuxt Auth endpoints
    this.post('/sessions', function (schema, request) {
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
