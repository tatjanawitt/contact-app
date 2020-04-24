'use strict'

const get = (contacts, lang) => {
  contacts = addContactsToBirthMonth(contacts, lang)
  const removed = contacts.splice(new Date().getMonth())
  return removed.concat(contacts).filter(el => el.contacts.length > 0)
}
const addContactsToBirthMonth = (contacts, lang) => {
  const yearNow = new Date().getFullYear()
  return monthList(lang).map(item => ({
    month: item,
    contacts: contacts.filter(c =>
      item === new Date(c.born).toLocaleString(lang, { month: 'long' })
    ).sort((a, b) => {
      const aBorn = new Date(yearNow, a.born.getMonth(), a.born.getDate())
      const bBorn = new Date(yearNow, b.born.getMonth(), b.born.getDate())
      return aBorn - bBorn
    })
  }))
}
const monthList = (lang) => {
  return Array.from(Array(12), (e, i) =>
    new Date(25e8 * ++i).toLocaleString(lang, { month: 'long' })
  )
}
export default { get }
