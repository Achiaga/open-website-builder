import PropTypes from 'prop-types'
import { RedirectWrapper } from '../../builder/blocks/text'

export const PrevText = (props) => {
  const redirectUrl = props?.redirect

  function createMarkup() {
    return { __html: props.text }
  }
  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <div
        className="textStyles"
        style={{
          boxSizing: 'border-box',
          lineHeight: '1.42',
          height: '100%',
          outline: 'none',
          padding: '0px',
          tabSize: '4',
          textAlign: 'left',
          wordWrap: 'break-word',
          backgroundColor: 'transparent',
          width: '100%',
        }}
      >
        <span
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            wordBreak: 'break-word',
            color: 'gray.500',
          }}
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    </RedirectWrapper>
  )
}

PrevText.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.string,
  textAlign: PropTypes.string,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  alignItems: PropTypes.string,
  fontWeight: PropTypes.string,
  textShadow: PropTypes.string,
  borderRadius: PropTypes.string,
  bg: PropTypes.string,
}
