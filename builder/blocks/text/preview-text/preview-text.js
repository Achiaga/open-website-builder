import { GenericText } from '../text'
import { TextPropTypes } from '../index'

const PreviewText = ({ data }) => {
	return <GenericText text={data?.text} {...data} />
}

PreviewText.propTypes = {
	data: TextPropTypes
}

export default PreviewText
