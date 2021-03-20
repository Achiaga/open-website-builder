export const imageURL =
  'https://images.unsplash.com/photo-1542103749-8ef59b94f47e'

export const FallbackData = {
  blocks: {
    'text-520af5a8-d661-4487-bae9-cbc759bfdd51': {
      type: 'text',
      data: {
        text: 'Test block text',
        fontSize: '1rem',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: '400',
        boxShadow: 'none',
        borderRadius: '0px',
        fontColor: '#1F1F1F',
        backgroundColor: '#FAFAFA',
      },
    },
    'inception-01a194d6-4b21-4516-a307-41b9305e9be2': {
      type: 'inception',
      data: {
        boxShadow: 'none',
        borderRadius: '0px',
        backgroundColor: 'trasnparent',
      },
    },
    'child-inception-33bb7f62-3b9d-46bf-a605-4a2835cb003d': {
      type: 'image',
      data: {
        boxShadow: 'none',
        borderRadius: '0px',
        imageUrl: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e',
      },
    },
  },
  layouts: {
    'text-520af5a8-d661-4487-bae9-cbc759bfdd51': {
      w: 100,
      h: 10,
      x: 0,
      y: 0,
      i: 'text-520af5a8-d661-4487-bae9-cbc759bfdd51',
      moved: false,
      static: false,
      isDraggable: true,
      isResizable: true,
    },
    'inception-01a194d6-4b21-4516-a307-41b9305e9be2': {
      w: 101,
      h: 34,
      x: 46,
      y: 38,
      i: 'inception-01a194d6-4b21-4516-a307-41b9305e9be2',
      moved: false,
      static: false,
      isDraggable: true,
    },
    'child-inception-33bb7f62-3b9d-46bf-a605-4a2835cb003d': {
      w: 55,
      h: 10,
      x: 9,
      y: 2,
      i: 'child-inception-33bb7f62-3b9d-46bf-a605-4a2835cb003d',
      moved: false,
      static: false,
      isDraggable: true,
    },
  },
  structure: {
    main: [
      'text-520af5a8-d661-4487-bae9-cbc759bfdd51',
      'inception-01a194d6-4b21-4516-a307-41b9305e9be2',
    ],
    'inception-01a194d6-4b21-4516-a307-41b9305e9be2': [
      'child-inception-33bb7f62-3b9d-46bf-a605-4a2835cb003d',
    ],
  },
}
