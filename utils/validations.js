const required = (propertyType) => {
  return v => (v && v.length > 0) || `${propertyType} ist ein Pflichtfeld.`
}
const minLength = (propertyType, minLength) => {
  return v => (v && v.length >= minLength) || `${propertyType} muss mind. ${minLength} Zeichen lang sein.`
}
const maxLength = (propertyType, maxLength) => {
  return v => (v && v.length <= maxLength) || `${propertyType} darf nicht länger als ${maxLength} Zeichen lang sein.`
}

const emailFormat = () => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,24})+$/
  return v => (v && regex.test(v)) || 'Bitte eine gültige Email eintragen.'
}
const zipFormat = () => {
  return v => !v || /^[0-9]{5}?$/.test(v) || 'Bitte eine gültige PLZ eintragen.'
}

export default {
  required,
  minLength,
  maxLength,
  emailFormat,
  zipFormat
}
