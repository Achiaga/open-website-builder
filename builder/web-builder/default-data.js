import { imageURL } from '../initial-data'

export const blocksProperties = {
  text: {
    text: 'Test block text',
    fontSize: '1rem',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '400',
    boxShadow: 'none',
    borderRadius: '0px',
    fontColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  image: {
    boxShadow: 'none',
    borderRadius: '0px',
    imageUrl: imageURL,
  },
  inception: {
    border: '0px solid black',
    boxShadow: 'none',
    borderRadius: '0px',
    backgroundColor: 'transparent',
  },
}
