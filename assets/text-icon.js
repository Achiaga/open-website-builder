const TextIcon = ({ colorIcon }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 61 54"
      fill="none"
    >
      <rect x="2" width="57" height="6" fill={colorIcon} />
      <ellipse cx="2.5" cy="3" rx="2.5" ry="3" fill={colorIcon} />
      <ellipse cx="58.5" cy="3" rx="2.5" ry="3" fill={colorIcon} />
      <rect x="2" y="32" width="57" height="6" fill={colorIcon} />
      <ellipse cx="2.5" cy="35" rx="2.5" ry="3" fill={colorIcon} />
      <ellipse cx="58.5" cy="35" rx="2.5" ry="3" fill={colorIcon} />
      <rect x="10" y="16" width="41" height="6" fill={colorIcon} />
      <ellipse cx="9.5" cy="19" rx="2.5" ry="3" fill={colorIcon} />
      <ellipse cx="51.5" cy="19" rx="2.5" ry="3" fill={colorIcon} />
      <rect x="10" y="48" width="41" height="6" fill={colorIcon} />
      <ellipse cx="9.5" cy="51" rx="2.5" ry="3" fill={colorIcon} />
      <ellipse cx="51.5" cy="51" rx="2.5" ry="3" fill={colorIcon} />
    </svg>
  )
}

export default TextIcon
