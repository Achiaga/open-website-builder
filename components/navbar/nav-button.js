import Button from '../commun/button';

const NavButton = ({ content, id, onClick }) => {
	return (
		<Button
			id={id}
			color='black'
			fontWeight='500'
			background='transparent'
			border='none'
			onClick={onClick}
			_hover={{ bg: 'primary.100' }}>
			{content}
		</Button>
	);
};

export default NavButton;
