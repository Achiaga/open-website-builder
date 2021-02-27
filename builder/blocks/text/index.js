import PropTypes from 'prop-types'
export { default as Text } from './text'

export const TextPropTypes = PropTypes.shape({
	text: PropTypes.string,
	editBlock: PropTypes.func,
	fontSize: PropTypes.string,
	textAlign: PropTypes.string,
	fontColor: PropTypes.string,
	bg: PropTypes.string
})
