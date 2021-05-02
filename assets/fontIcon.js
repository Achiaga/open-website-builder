import PropTypes from 'prop-types'

export const BgIcon = ({ bgColor }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '20px',
        textAlign: 'center',
        fontSize: '14px',
        borderRadius: '3px',
        fontWeight: '500',
        boxShadow: 'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset',
        background: bgColor,
      }}
    >
      A
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
        width: '22px',
        height: '22px',
        textAlign: 'center',
        fontSize: '16px',
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
  bgColor: PropTypes.string.isRequired,
}

FontIcon.propTypes = {
  fontColor: PropTypes.string.isRequired,
}
