'use strict'

import { Server, Model, JSONAPISerializer, hasMany } from 'miragejs'
import _ from 'lodash'
import contactsJSON from '@/data/contacts.json'
import tagsJSON from '@/data/tags.json'
// import usersJSON from '@/data/users.json';

const BaseSerializer = JSONAPISerializer.extend({
  keyForAttribute (attr) {
    return _.camelCase(attr)
  }
})
/* eslint-disable no-new */
new Server({
  fixtures: {
    contacts: contactsJSON,
    tags: tagsJSON
  },
  models: {
    contact: Model.extend({
      tags: hasMany()
    }),
    tag: Model.extend({
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
      include: ['tags'],
      normalize (json) {
        return {
          data: {
            type: 'contact',
            attributes: json
          }
        }
      }
    })
    // user: BaseSerializer.extend({
    //   attrs: ['name', 'email', 'admin', 'playedVideoIds'],
    //   keyForAttribute(attr) {
    //     return attr
    //   }
    // })
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
    // this.post('/video_plays', (schema, request) => {
    //   return new Response(201);
    // });

    // Nuxt Auth endpoints
    /*     this.post("/sessions", function (schema, request) {
          let json = JSON.parse(request.requestBody)
          let response = schema.users.findBy({ email: json.email })
          if (json.password == 'aaaaaaaa') { // your actual backend should test the hashed password in the DB
            return { token: response.attrs.token }
          } else {
            return new Response(401)
          }
        });
        this.post("/users", function (schema, request) {
          let json = JSON.parse(request.requestBody)
          let token = Math.random().toString().slice(1)
          json['token'] = token;
          json['playedVideoIds'] = [];
          schema.db.users.insert(json)
          return { token }
        });
        this.get('/sessions/user', function (schema, request) {
          let token = request.requestHeaders.Authorization
          let response = schema.users.findBy({ token: token })
          return this.serialize(response)
        }) */
  }
})
