import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

function createRootElement(id) {
	const rootContainer = document.createElement('div')
	rootContainer.setAttribute('id', id)
	return rootContainer
}

function addRootElement(rootElem) {
	const gridElement = document.getElementById('main-builder')
	console.log('gridElement', gridElement)
	document.body.insertBefore(
		rootElem,
		gridElement
		// document.body.lastElementChild.nextElementSibling
	)
}

function usePortal(id) {
	const rootElemRef = useRef(null)

	useEffect(
		function setupElement() {
			const existingParent = document.getElementById('main-builder')
			// const existingParent = document.getElementById(
			// 	'bac9475d-c98b-49bd-8599-7fd071cce106'
			// )
			console.log(existingParent)
			const parentElem = existingParent || createRootElement(id)
			if (!existingParent) {
				addRootElement(parentElem)
			}

			parentElem.appendChild(rootElemRef.current)

			return function removeElement() {
				rootElemRef.current.remove()
				if (!parentElem.childElementCount) {
					parentElem.remove()
				}
			}
		},
		[id]
	)

	function getRootElem() {
		if (!rootElemRef.current) {
			rootElemRef.current = document.createElement('div')
		}
		return rootElemRef.current
	}

	return getRootElem()
}

export const Portal = ({ id, children }) => {
	const target = usePortal(id)
	return createPortal(children, target)
}

export default usePortal
