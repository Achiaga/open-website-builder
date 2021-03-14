const List = ({ data }) => {
	return (
		<>
			<h3>{data?.title}</h3>
			<ul>
				{data?.elements?.map((element, index) => (
					<li key={index}>{element}</li>
				))}
			</ul>
		</>
	)
}

export default List
