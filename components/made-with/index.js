import LogoSvg from '../../assets/logo'

const MadeWith = () => {
  return (
    <a target="_blank" href="https://antfolio.app" rel="noreferrer">
      <div
        style={{
          display: 'flex',
          position: 'fixed',
          bottom: '1rem',
          right: '1.5rem',
          fontSize: '12px',
          backgroundColor: 'white',
          border: '1px solid',
          borderColor: '#eff1f4',
          borderRadius: '5px',
          padding: '8px 10px',
          fontWeight: 600,
          boxShadow: '3px 3px 10px 3px rgba(56,28,100,0.1)',
          alignItems: 'center',
          zIndex: '9999',
        }}
      >
        <div
          style={{
            marginRight: '6px',
          }}
        >
          <LogoSvg width="14px" />
        </div>
        Made with
        <div
          style={{
            fontWeight: 600,
            marginLeft: '4px',
          }}
        >
          Antfolio
        </div>
      </div>
    </a>
  )
}

export default MadeWith
