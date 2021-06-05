import { imageURL } from '../initial-data'

export const blocksProperties = {
  text: {
    text: '<h4>Text</h4>',
    boxShadow: 'none',
    borderRadius: '0px',
    fontColor: '#000000',
  },
  image: {
    boxShadow: 'none',
    borderRadius: '0px',
    imageUrl: imageURL,
  },
  inception: {
    border: 'none',
    boxShadow: 'none',
    borderRadius: '0px',
    backgroundColor: 'transparent',
  },
  button: {
    border: 'none',
    boxShadow: 'none',
    borderRadius: '0px',
    backgroundColor: '#000000',
    text: 'Button',
    inputPlaceholder: 'eg: your@email.com',
    fontColor: '#ffffff',
  },
  'button-flurly': {
    border: 'none',
    boxShadow: 'none',
    borderRadius: '0px',
    backgroundColor: '#39b2ab',
    text: 'Buy $9.0',
    inputPlaceholder: 'eg: Buy $9.0',
    fontColor: '#ffffff',
  },
  'button-gumroad': {
    border: 'none',
    boxShadow: 'none',
    borderRadius: '0px',
    backgroundColor: 'red',
    text: 'Buy my product',
    inputPlaceholder: 'eg: Buy $9.0',
    fontColor: '#ffffff',
  },
  form: {
    border: 'none',
    boxShadow: 'none',
    borderRadius: '0px',
    backgroundColor: '#000000',
  },
}
