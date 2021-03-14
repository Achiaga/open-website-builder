export const imageURL =
	'https://images.unsplash.com/photo-1542103749-8ef59b94f47e'

export const FallbackData = {
	a: {
		block: {
			type: 'text',
			data: {
				text: 'Welcome'
			}
		},
		layout: {
			i: 'a',
			x: 0,
			y: 0,
			w: 100,
			h: 20,
			isDraggable: true
		}
	},
	b: {
		block: {
			type: 'inception',
			data: {
				blocks: {
					'inception-1': {
						block: {
							type: 'text',
							data: {
								text: 'Hello!!!! I am inception. I am a killer feature'
							}
						},
						layout: { i: 'inception-1', x: 0, y: 0, w: 10, h: 10 }
					}
				}
			}
		},
		layout: {
			i: 'b',
			x: 0,
			y: 20,
			w: 100,
			h: 30,
			isDraggable: true
		}
	}
}
