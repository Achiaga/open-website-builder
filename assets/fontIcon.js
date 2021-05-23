import PropTypes from 'prop-types'

export const BgIcon = ({ bgColor, gradientColor1, gradientColor2 }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '20px',
        textAlign: 'center',
        fontSize: '12px',
        borderRadius: '3px',
        fontWeight: '500',
        boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset',
        background: gradientColor1
          ? `linear-gradient(225deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`
          : bgColor,
      }}
    >
      {gradientColor1 ? 'G' : 'B'}
    </div>
  )
}
export const FontIcon = ({ fontColor }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '20px',
        textAlign: 'center',
        fontSize: '12px',
        borderRadius: '3px',
        fontWeight: '500',
        boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset',
        color: fontColor,
        fill: fontColor,
      }}
    >
      A
    </div>
  )
}

BgIcon.propTypes = {
  bgColor: PropTypes.string,
}

FontIcon.propTypes = {
  fontColor: PropTypes.string,
}
