import v from '@/utils/validations'
const contactForm = [
  {
    value: 'fName',
    icon: 'mdi-account-heart',
    max: '30',
    min: '3',
    rules: [v.required(), v.minLength(3)]
  },
  {
    value: 'lName',
    icon: 'mdi-human-male-boy',
    max: '30',
    min: '3',
    rules: [v.required(), v.minLength(3)]
  },
  {
    value: 'email',
    icon: 'mdi-email',
    max: '50',
    rules: [v.required(), v.emailFormat()]
  },
  {
    value: 'fon',
    icon: 'mdi-phone',
    max: '30'
  },
  {
    value: 'mobil',
    icon: 'mdi-cellphone-wireless',
    max: '30'
  },
  {
    value: 'street',
    icon: 'mdi-home',
    max: '50'
  },
  {
    value: 'zip',
    icon: 'mdi-map-marker',
    max: '5',
    rules: [v.zipFormat()]
  },
  {
    value: 'place',
    icon: 'mdi-home-city',
    max: '50'
  },
  {
    value: 'img',
    icon: 'mdi-file-image-outline'
  },
  {
    value: 'rating',
    icon: 'mdi-heart',
    max: '1',
    rules: [v.ratingFormat()]
  }
]

export default {
  contactForm
}
