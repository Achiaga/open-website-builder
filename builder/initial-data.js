export const imageURL =
	'https://images.unsplash.com/photo-1542103749-8ef59b94f47e'

export const initialLB = {
	a: {
		type: 'title',
		data: {
			text: 'Hola, soy Pedro'
		}
	},
	b: { type: 'image', data: { imageUrl: imageURL } },
	c: {
		type: 'title',
		data: { text: 'Hoobies' }
	}
}

export const userBlocksData = {
	a: {
		block: {
			type: 'title',
			data: {
				text: 'Hola, soy Pedro'
			}
		},
		layout: {
			i: 'a',
			x: 0,
			y: 0,
			w: 3,
			h: 2,
			isDraggable: true
		}
	},
	b: {
		block: {
			type: 'image',
			data: { imageUrl: imageURL }
		},
		layout: { i: 'b', x: 3, y: 0, w: 3, h: 2, isDraggable: true }
	},
	c: {
		block: {
			type: 'title',
			data: { text: 'Hoobies' }
		},
		layout: {
			i: 'c',
			x: 6,
			y: 0,
			w: 4,
			h: 2,
			isDraggable: true
		}
	}
}
