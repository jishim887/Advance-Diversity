import PropTypes from 'prop-types';

const surveyWizardPropTypes = {
    surveyData: PropTypes.shape({
        surveyName: PropTypes.string.isRequired,
        surveyDescription: PropTypes.string.isRequired,
        surveyTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        surveyStatusId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                sortOrder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                questions: PropTypes.arrayOf(
                    PropTypes.shape({
                        question: PropTypes.string.isRequired,
                        helpText: PropTypes.string.isRequired,
                        isRequired: PropTypes.arrayOf(PropTypes.string).isRequired,
                        questionTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                        isMultipleAllowed: PropTypes.arrayOf(PropTypes.string).isRequired,
                        answwerOptions: PropTypes.arrayOf(
                            PropTypes.shape({
                                text: PropTypes.string,
                                value: PropTypes.string,
                                additionalInfo: PropTypes.string,
                            })
                        ),
                        sortOrder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                    })
                ),
            })
        ),
    }),

    touched: PropTypes.shape({
        surveyName: PropTypes.bool,
        surveyDescription: PropTypes.bool,
        surveyTypeId: PropTypes.bool,
        surveyStatusId: PropTypes.bool,
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.bool,
                description: PropTypes.bool,
                sortOrder: PropTypes.bool,
                questions: PropTypes.arrayOf(
                    PropTypes.shape({
                        userId: PropTypes.bool,
                        question: PropTypes.bool,
                        helpText: PropTypes.bool,
                        isRequired: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
                        type: PropTypes.bool,
                        isMultipleAllowed: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
                        optionFields: PropTypes.arrayOf(
                            PropTypes.shape({
                                text: PropTypes.bool,
                                value: PropTypes.bool,
                                additionalInfo: PropTypes.bool,
                                createdBy: PropTypes.bool,
                            })
                        ),
                        sortOrder: PropTypes.bool,
                    })
                ),
            })
        ),
    }),

    errors: PropTypes.shape({
        surveyName: PropTypes.string,
        surveyDescription: PropTypes.string,
        surveyTypeId: PropTypes.string,
        surveyStatusId: PropTypes.string,
        sections: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                description: PropTypes.string,
                sortOrder: PropTypes.string,
                questions: PropTypes.arrayOf(
                    PropTypes.shape({
                        userId: PropTypes.string,
                        question: PropTypes.string,
                        helpText: PropTypes.string,
                        isRequired: PropTypes.string,
                        type: PropTypes.string,
                        isMultipleAllowed: PropTypes.string,
                        optionFields: PropTypes.arrayOf(
                            PropTypes.shape({
                                text: PropTypes.string,
                                value: PropTypes.string,
                                additionalInfo: PropTypes.string,
                                createdBy: PropTypes.string,
                            })
                        ),
                        sortOrder: PropTypes.string,
                    })
                ),
            })
        ),
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
};

export { surveyWizardPropTypes };
