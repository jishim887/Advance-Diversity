import * as Yup from 'yup';

const surveyBaseSchema = Yup.object().shape({
    surveyName: Yup.string()
        .min(2, 'Survey Name must be at least 2 characters')
        .max(100, 'Survey Name cannot be more than 100 characters')
        .required('Survey Name is required.'),
    surveyDescription: Yup.string()
        .min(2, 'Survey Description must be at least 2 characters')
        .max(2000, 'Survey Description cannot be more than 100 characters')
        .required('Survey Description is required.'),
    surveyTypeId: Yup.string().notOneOf(['0'], 'Please select a Survey Type'),
    surveyStatusId: Yup.string().notOneOf(['0'], 'Please select a Survey Status'),
});

const surveySectionSchema = Yup.object().shape({
    sections: Yup.array()
        .of(
            Yup.object().shape({
                title: Yup.string()
                    .min(2, 'Title must be at least 2 characters.')
                    .max(100, 'Title cannot be more than 100 characters.'),
                description: Yup.string()
                    .min(2, 'Description must be at least 2 characters.')
                    .max(2000, 'Description cannot be more than 100 characters'),
                sortOrder: Yup.number().typeError('Sort order must be a number').required('Sort order is required.'),
            })
        )
        .min(1, 'At least 1 Section is required')
        .required('At least 1 Section is required'),
});

const surveyQuestionSchema = Yup.object().shape({
    sections: Yup.array().of(
        Yup.object().shape({
            questions: Yup.array().of(
                Yup.object().shape({
                    question: Yup.string()
                        .min(2, 'Question must be at least 2 characters.')
                        .max(500, 'Question cannot be more than 500 characters.')
                        .required('Question is required.'),
                    helpText: Yup.string()
                        .min(2, 'Help Text must be at least 2 characters.')
                        .max(255, 'Help Text cannot be more than 255 characters')
                        .required('Help Text is required.'),
                    isRequired: Yup.array().of(Yup.number()),
                    questionTypeId: Yup.string()
                        .notOneOf(['0'], 'Please select a Question Type')
                        .required('Question Type is required.'),
                    isMultipleAllowed: Yup.array().of(Yup.number()),
                    answerOptions: Yup.array().of(
                        Yup.object().shape({
                            text: Yup.string(),
                            value: Yup.string(),
                            additionalInfo: Yup.string(),
                        })
                    ),
                    sortOrder: Yup.number()
                        .typeError('Sort order must be a number')
                        .required('Sort order is required.'),
                    statusId: Yup.string()
                        .notOneOf(['0'], 'Please select a Question Status')
                        .required('Question Status is required.'),
                })
            ),
        })
    ),
});

const surveyFormSchema = Yup.object().shape({
    sections: Yup.array().of(
        Yup.object().shape({
            questions: Yup.array().of(
                Yup.object().shape({
                    answers: Yup.object().shape({
                        questionTypeId: Yup.number(),
                        isRequired: Yup.boolean(),
                        answerOptionId: Yup.lazy((value) =>
                            typeof value === 'object'
                                ? Yup.array().when(['questionTypeId', 'isRequired'], {
                                      is: (questionTypeId, isRequired) => questionTypeId === 8 && isRequired,
                                      then: Yup.array()
                                          .of(Yup.string().min(1))
                                          .min(1, 'Select at least one answer.')
                                          .required('Select at least one answer.'),
                                      otherwise: Yup.array().of(Yup.string()),
                                  })
                                : Yup.string().when(['questionTypeId', 'isRequired'], {
                                      is: (questionTypeId, isRequired) => questionTypeId === 8 && isRequired,
                                      then: Yup.string().required('Answer required.'),
                                      otherwise: Yup.string(),
                                  })
                        ),
                        answerNumber: Yup.lazy((value) =>
                            typeof value === 'object'
                                ? Yup.array().when(['questionTypeId', 'isRequired'], {
                                      is: (questionTypeId, isRequired) =>
                                          (questionTypeId === 1 || questionTypeId === 5 || questionTypeId === 6) &&
                                          isRequired,
                                      then: Yup.array()
                                          .of(Yup.string())
                                          .min(1, 'Select at least one answer.')
                                          .required('Select at least one answer.'),
                                      otherwise: Yup.array().of(Yup.string()),
                                  })
                                : Yup.string().when(['questionTypeId', 'isRequired'], {
                                      is: (questionTypeId, isRequired) =>
                                          (questionTypeId === 1 || questionTypeId === 5 || questionTypeId === 6) &&
                                          isRequired,
                                      then: Yup.string().required('Answer required.'),
                                      otherwise: Yup.string(),
                                  })
                        ),
                        answer: Yup.string()
                            .max(500, 'Answer cannot be more than 500 characters.')
                            .when(['questionTypeId', 'isRequired'], {
                                is: (questionTypeId, isRequired) =>
                                    (questionTypeId === 2 ||
                                        questionTypeId === 3 ||
                                        questionTypeId === 4 ||
                                        questionTypeId === 7) &&
                                    isRequired,
                                then: Yup.string()
                                    .max(500, 'Answer cannot be more than 500 characters.')
                                    .required('Answer required.'),
                            }),
                    }),
                })
            ),
        })
    ),
});

export { surveyBaseSchema, surveySectionSchema, surveyQuestionSchema, surveyFormSchema };
