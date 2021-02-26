export const imageURL =
	'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

export const initialLayout = [
	{ i: 'a', x: 0, y: 0, w: 3, h: 2, isDraggable: true },
	{ i: 'b', x: 3, y: 0, w: 3, h: 2, isDraggable: true },
	{ i: 'c', x: 6, y: 0, w: 4, h: 2, isDraggable: true },
	{ i: 'e', x: 0, y: 4, w: 5, h: 4, isDraggable: false }
]

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
