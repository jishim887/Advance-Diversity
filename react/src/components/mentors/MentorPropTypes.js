import PropTypes from 'prop-types';

const mentorCardPropTypes = {
    mentor: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
};
const mentorModalPropTypes = {
    onHide: PropTypes.func.isRequired,
};

export { mentorCardPropTypes, mentorModalPropTypes };
