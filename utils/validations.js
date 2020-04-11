const required = () => {
  return v => (v && v.length > 0) || 'required / Pflichtfeld'
}
const minLength = (minLength) => {
  return v => (v && v.length >= minLength) || `min ${minLength} characters / Zeichen`
}
const maxLength = (maxLength) => {
  return v => (v && v.length <= maxLength) || `max ${maxLength} characters / Zeichen`
}

const emailFormat = () => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,24})+$/
  return v => (v && regex.test(v)) || 'invalid / ungültig'
}
const zipFormat = () => {
  return v => !v || /^[0-9]{5}?$/.test(v) || 'invalid / ungültig'
}

const ratingFormat = () => {
  return v => !v || /^[0-5]{1}[\W_]?$/.test(v) || 'number <= 5'
}
export default {
  required,
  minLength,
  maxLength,
  emailFormat,
  zipFormat,
  ratingFormat
}
