import { useRef } from 'react'

function Title({ data, blockKey }) {
	const titleRef = useRef(null)
	function handleKeyDown() {
		const value = titleRef.current.innerText
		data.callback(value, blockKey)
	}
	return (
		<h1 onKeyDown={handleKeyDown} contentEditable ref={titleRef}>
			{data?.text}
		</h1>
	)
}

export default Title
