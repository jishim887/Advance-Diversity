import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const mentorProfileSchema = Yup.object().shape({
  firstName: Yup.string().max(100,"Cannot be more than 100 characters").required("Required."),
  lastName: Yup.string().max(100,"Cannot be more than 100 characters").required("Required."),
  imageUrl: Yup.string().max(4000,"Cannot be more than 4000 characters"),
  description: Yup.string().max(500,"Cannot be more than 500 characters").required("Required."),
  phoneNumber: Yup.string().matches(phoneRegExp, "Invalid phone number.").max(10, "Cannot be more than 10 characters."),
  socialMediaLink: Yup.string().max(4000,"Cannot be more than 4000 characters"),
  location: Yup.object().shape({
    lineOne: Yup.string().required("Required"),
    lineTwo: Yup.string(),
    city: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    locationTypeId: Yup.number().notOneOf(['0',0], 'Please select a Location Type').required("Required"),
    stateId: Yup.number().notOneOf(['0',0], 'Please select a state').required("Required"),
  }),
  focusAreas: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
  ages: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
  grades: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
  mentoringTypes: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
  genderTypes: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
  specialties: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
});

const personalInfoFormSchema = Yup.object().shape({
  firstName: Yup.string().max(100,"Cannot be more than 100 characters").required("Required."),
  lastName: Yup.string().max(100,"Cannot be more than 100 characters").required("Required."),
  imageUrl: Yup.string().max(4000,"Cannot be more than 4000 characters").required("Required."),
  description: Yup.string().max(500,"Cannot be more than 500 characters").required("Required."),
  phoneNumber: Yup.string().matches(phoneRegExp, "Invalid phone number.").max(10, "Cannot be more than 10 characters."),
  socialMediaLink: Yup.string().max(4000,"Cannot be more than 4000 characters"),
});

const mentorLocationFormSchema = Yup.object().shape({
  location: Yup.object().shape({
    lineOne: Yup.string().required("Required"),
    lineTwo: Yup.string(),
    city: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    locationTypeId: Yup.number().notOneOf(['0',0], 'Please select a Location Type').required("Required"),
    stateId: Yup.number().notOneOf(['0',0], 'Please select a Location Type').required("Required"),
  }),
})

const focusAreasFormSchema =Yup.object().shape({
  focusAreas: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
});

const mentorOptionsFormSchema = Yup.object().shape({
  ages: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
  grades: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
  mentoringTypes: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
  genderTypes: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
  specialties: Yup.array().of(Yup.string()).min(1, "Please select at least one option").required("required"),
})



export {mentorProfileSchema, personalInfoFormSchema, focusAreasFormSchema, mentorOptionsFormSchema, mentorLocationFormSchema};