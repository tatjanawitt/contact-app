import v from '@/utils/validations'
const contactForm = [
  {
    text: 'Vorname*',
    value: 'fName',
    icon: 'mdi-account-heart',
    max: '30',
    min: '3',
    rules: [v.required('Vorname'), v.minLength('Vorname', 3)]
  },
  {
    text: 'Nachname*',
    value: 'lName',
    icon: 'mdi-human-male-boy',
    max: '30',
    min: '3',
    rules: [v.required('Nachname'), v.minLength('Nachname', 3)]
  },
  {
    text: 'Email*',
    value: 'email',
    icon: 'mdi-email',
    max: '50',
    rules: [v.required('Email'), v.emailFormat()]
  },
  {
    text: 'Telefon',
    value: 'fon',
    icon: 'mdi-phone',
    max: '30'
  },
  {
    text: 'Mobil',
    value: 'mobil',
    icon: 'mdi-cellphone-wireless',
    max: '30'
  },
  {
    text: 'Strasse',
    value: 'street',
    icon: 'mdi-home',
    max: '50'
  },
  {
    text: 'Postleitzahl',
    value: 'zip',
    icon: 'mdi-map-marker',
    max: '5',
    rules: [v.zipFormat()]
  },
  {
    text: 'Ort',
    value: 'place',
    icon: 'mdi-home-city',
    max: '50'
  },
  {
    text: 'Bild (URL)',
    value: 'img',
    icon: 'mdi-file-image-outline'
  },
  {
    text: 'Bewertung (1-5)',
    value: 'rating',
    icon: 'mdi-heart',
    max: '1',
    rules: [v.ratingFormat()]
  }
]

export default {
  contactForm
}
