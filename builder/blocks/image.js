const Image = ({ data }) => {
	return (
		<div
			style={{
				backgroundImage: `url(${data})`,
				width: '100%',
				height: '100%',
				backgroundPosition: '50% 50%',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
			}}
		/>
	)
}

export default Image
