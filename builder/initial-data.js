export const imageURL =
	'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

export const initialLayout = [
	{ i: 'a', x: 0, y: 0, w: 3, h: 2 },
	{ i: 'b', x: 3, y: 0, w: 3, h: 2 },
	{ i: 'c', x: 6, y: 0, w: 4, h: 2 },
	{ i: 'd', x: 0, y: 2, w: 3, h: 2 }
]

export const initialLB = {
	a: {
		type: 'title',
		data: {
			text: 'Hola, soy Pedro',
			callback: () => {}
		}
	},
	b: { type: 'img', data: imageURL },
	c: {
		type: 'list',
		data: { title: 'My Skills', elements: ['Code', 'Money', 'Marketing'] }
	},
	d: {
		type: 'list',
		data: { title: 'Hoobies', elements: ['Code', 'Money', 'Marketing'] }
	}
}
