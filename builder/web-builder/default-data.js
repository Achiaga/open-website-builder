import { imageURL } from '../initial-data'

export const blocksProperties = {
  text: {
    text: 'Text',
    fontSize: '24',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '400',
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
    buttonText: 'Send',
    inputPlaceholder: 'eg: your@email.com',
  },
  form: {
    border: 'none',
    boxShadow: 'none',
    borderRadius: '0px',
    backgroundColor: '#000000',
  },
}
