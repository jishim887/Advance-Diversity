import React, { useEffect, useState } from 'react';
import { withFormik, Field, ErrorMessage } from 'formik';
import { Col, Row, Card, Form } from 'react-bootstrap';
import { personalInfoFormSchema } from '../../schema/mentorProfileSchema';
import { mentorWizardPropTypes } from './MentorProfilePropTypes';
import FileUploader from '../files/FileUploader';
import './mentor-loki-form.css';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

const PersonalInfoForm = (props) => {
  const { values, 
    onNext, onBack, setTouched, errors, handleSubmit,isSubmitting, cantBack, backLabel, nextLabel } = props;
  
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
      onChange();
  }, [values]);

  useEffect (()=>{
    setProfileImage(props.formData.imageUrl)
    setTouched({"imageUrl": true});
  },[props.formData.imageUrl])

  const onChange = () => {
      props.onChange(values);
  };

  const handleUpload = (urlList) => {
    const imageUrl = urlList[0].url;
    values.imageUrl = imageUrl;
    setProfileImage(imageUrl)
    toastr['success']('Profile image added.');
  };

  const onNextClicked = () => {
      onNext(values); 
  };
  const onBackClicked = () => {
    onBack(values);
  };

  return (
      <Form onSubmit={handleSubmit}>
          <Card className="mentor-card">
              <Card.Header>
                  <h1>Mentor Profile Form</h1>
                  <h4>
                      Thank you for expressing your interest in becoming a mentor for our organization! We would like
                      to know more information about yourself in order to better match you with mentees.
                  </h4>
              </Card.Header>
              <Card.Body>
                  <div className="form-group">
                      <Row>
                          <Col md={6}>
                              <label htmlFor="firstName">First Name</label>
                              <Field type="text" name="firstName" className="form-control" />
                              <ErrorMessage name="firstName" component="div" className="field-error" />
                          </Col>
                          <Col md={6}>
                              <label htmlFor="lastName">Last Name</label>
                              <Field type="text" name="lastName" className="form-control" />
                              <ErrorMessage name="lastName" component="div" className="field-error" />
                          </Col>
                      </Row>
                  </div>
                  <div className="form-group">
                      <label htmlFor="imageUrl">Profile Image</label>
                      <ErrorMessage name="imageUrl" component="div" className="field-error" />
                      <Row className="d-flex align-items-center">
                          <Col md="3" className="text-center">
                              <img src={profileImage} alt="" className="profile-image rounded-circle" />
                          </Col>
                          <Col md="9">
                              <span>
                                  <FileUploader
                                      onHandleUploadSuccess={handleUpload}
                                      isMultiple={false}
                                      className="file-box"
                                  />
                              </span>
                          </Col>
                      </Row>
                  </div>
                  <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <Field type="text" name="description" className="form-control" />
                      <ErrorMessage name="description" component="div" className="field-error" />
                  </div>
                  <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number {'(optional)'}</label>
                      <Field type="text" name="phoneNumber" className="form-control" />
                      <ErrorMessage name="phoneNumber" component="div" className="field-error" />
                  </div>{' '}
                  <div className="form-group">
                      <label htmlFor="socialMediaLink">Social Media Link {'(optional)'}</label>
                      <Field type="text" name="socialMediaLink" className="form-control" />
                      <ErrorMessage name="socialMediaLink" component="div" className="field-error" />
                  </div>
              </Card.Body>
              <Card.Footer>
                  <div className="button-group">
                      <button
                          type="button"
                          className="btn btn-secondary"
                          disabled={isSubmitting || cantBack}
                          onClick={onBackClicked}>
                          {backLabel}
                      </button>
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting|| Boolean(errors.firstName || errors.lastName || errors.description)} onClick={onNextClicked}>
                          {nextLabel}
                      </button>
                  </div>
              </Card.Footer>
          </Card>
      </Form>
  );
};

PersonalInfoForm.propTypes = mentorWizardPropTypes;

export default withFormik({
    mapPropsToValues: (props) => ({
        firstName: props.formData.firstName,
        lastName: props.formData.lastName,
        imageUrl: props.formData.imageUrl,
        description: props.formData.description,
        phoneNumber: props.formData.phoneNumber,
        socialMediaLink: props.formData.socialMediaLink,
    }),

    validationSchema: personalInfoFormSchema,
    handleSubmit: (values, { props }) => {
        props.onNext(values);
    },
})(PersonalInfoForm);
