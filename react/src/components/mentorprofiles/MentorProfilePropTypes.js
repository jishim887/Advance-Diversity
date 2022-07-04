import PropTypes from 'prop-types';

const mentorWizardPropTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    socialMediaLink: PropTypes.string,
    location: PropTypes.shape({
      locationTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
    focusAreas: PropTypes.arrayOf(PropTypes.string).isRequired,
    ages: PropTypes.arrayOf(PropTypes.string).isRequired,
    grades: PropTypes.arrayOf(PropTypes.string).isRequired,
    mentoringTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    genderTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  cantBack: PropTypes.bool.isRequired,
}

export {mentorWizardPropTypes};