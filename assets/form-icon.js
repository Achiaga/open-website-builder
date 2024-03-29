const Form = ({ colorIcon }) => {
  return (
    <svg
      id="Outline"
      height="30"
      viewBox="0 0 512 512"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      fill={colorIcon}
    >
      <path d="m472 24h-432a24.028 24.028 0 0 0 -24 24v416a24.028 24.028 0 0 0 24 24h432a24.028 24.028 0 0 0 24-24v-416a24.028 24.028 0 0 0 -24-24zm-432 16h432a8.009 8.009 0 0 1 8 8v40h-448v-40a8.009 8.009 0 0 1 8-8zm432 432h-432a8.009 8.009 0 0 1 -8-8v-360h448v360a8.009 8.009 0 0 1 -8 8z" />
      <circle cx="120" cy="64" r="8" />
      <circle cx="88" cy="64" r="8" />
      <circle cx="56" cy="64" r="8" />
      <path d="m216 152h80a8 8 0 0 0 0-16h-80a8 8 0 0 0 0 16z" />
      <path d="m352 168h-192a8 8 0 0 0 -8 8v32a8 8 0 0 0 8 8h192a8 8 0 0 0 8-8v-32a8 8 0 0 0 -8-8zm-8 32h-176v-16h176z" />
      <path d="m352 232h-192a8 8 0 0 0 -8 8v32a8 8 0 0 0 8 8h192a8 8 0 0 0 8-8v-32a8 8 0 0 0 -8-8zm-8 32h-176v-16h176z" />
      <path d="m352 296h-192a8 8 0 0 0 -8 8v64a8 8 0 0 0 8 8h192a8 8 0 0 0 8-8v-64a8 8 0 0 0 -8-8zm-8 64h-176v-48h176z" />
      <path d="m272 392h-32a24 24 0 0 0 0 48h32a24 24 0 0 0 0-48zm0 32h-32a8 8 0 0 1 0-16h32a8 8 0 0 1 0 16z" />
    </svg>
  )
}

export default Form
