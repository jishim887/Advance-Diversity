import PropTypes from 'prop-types';

const surveyFormPropTypes = {
    typeId: PropTypes.number.isRequired,
    questionInfo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        helpText: PropTypes.string.isRequired,
        isRequired: PropTypes.bool.isRequired,
        isMultipleAllowed: PropTypes.bool.isRequired,
        questionTypeId: PropTypes.number.isRequired,
        sectionId: PropTypes.number.isRequired,
        statusId: PropTypes.number.isRequired,
        sortOrder: PropTypes.number.isRequired,
        answerOptions: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                questionId: PropTypes.number.isRequired,
                text: PropTypes.string,
                value: PropTypes.string,
                additionalInfo: PropTypes.string,
            })
        ),
        answers: PropTypes.shape({
            answerOptionId: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.arrayOf(PropTypes.string),
            ]),
            answerNumber: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.arrayOf(PropTypes.string),
            ]),
            answer: PropTypes.string,
        }),
    }),
    index: PropTypes.number,
    indexTwo: PropTypes.number,
};

export { surveyFormPropTypes };
