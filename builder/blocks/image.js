import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

export const GenericImage = forwardRef((props, ref) => {
	const modifiers = {
		boxShadow: props.boxShadow,
		borderRadius: props.borderRadius,
	};
	return (
		<Box
			cursor='pointer'
			onDoubleClick={(e) => props.isEditable && e.stopPropagation()}
			backgroundImage={`url(${props?.imageUrl})`}
			width='100%'
			height='100%'
			backgroundPosition='50% 50%'
			backgroundRepeat='no-repeat'
			backgroundSize='cover'
			{...modifiers}
		/>
	);
});
GenericImage.displayName = 'TextBlock';

GenericImage.propTypes = {
	contentEditable: PropTypes.bool,
	isEditable: PropTypes.bool,
	imageUrl: PropTypes.string,
	boxShadow: PropTypes.string,
	borderRadius: PropTypes.string,
	ref: PropTypes.any,
};

export default GenericImage;
