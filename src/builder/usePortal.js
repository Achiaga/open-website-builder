import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

function createRootElement(id) {
	const rootContainer = document.createElement('div')
	rootContainer.setAttribute('id', id)
	return rootContainer
}

function addRootElement(rootElem) {
	document.body.insertBefore(
		rootElem,
		document.body.lastElementChild.nextElementSibling
	)
}

function usePortal(id) {
	const rootElemRef = useRef(null)

	useEffect(
		function setupElement() {
			const existingParent = document.getElementById(id)
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
