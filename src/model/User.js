import { Firebase } from './../utils/Firebase'
import { Model } from './model'

export class User extends Model {
  constructor(id) {
    super()

    if (id) this.getById(id)
  }

  get name() {
    return this._data.name
  }
  set name(name) {
    this._data.name = name
  }

  get email() {
    return this._data.email
  }
  set email(email) {
    this._data.email = email
  }

  get photo() {
    return this._data.photo
  }
  set photo(photo) {
    this._data.photo = photo
  }

  get chatId() {
    return this._data.chatId
  }
  set chatId(chatId) {
    this._data.chatId = chatId
  }

  getById(id) {
    return new Promise((s, f) => {
      // Retorna os 'documentos' do usuário salvo no bd através de um id
      User.findByEmail(id).onSnapshot(doc => {
        this.fromJSON(doc.data())

        s(doc)
      })
    })
  }

  save() {
    return User.findByEmail(this.email).set(this.toJSON())
  }

  static getContactsRef(id) {
    return User.getRef().doc(id).collection('contacts')
  }

  // Retorna uma referência do BD
  static getRef() {
    return Firebase.db().collection('/users')
  }

  // Procura os documentos/ dados de uma referência específica do bd
  static findByEmail(email) {
    return User.getRef().doc(email)
  }

  // Cria uma nova coleção no bd apenas com o email do usuário (converte o email para um Base64 antes de salvar)
  addContact(contact) {
    return User.getContactsRef(this.email).doc(btoa(contact.email)).set(contact.toJSON())
  }

  getContacts() {

    return new Promise((s, f) => {

      User.getContactsRef(this.email).onSnapshot(docs => {

        let contacts = []

        docs.forEach(doc => {

          let data = doc.data()

          data.id = doc.id

          contacts.push(data)

        })

        this.trigger('contactschange', docs)

        s(contacts)

      })
    })
  }
}
