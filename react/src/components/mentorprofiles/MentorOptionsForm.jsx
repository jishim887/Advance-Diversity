import React, {useEffect, useState} from "react";
import { Form, Card, Row, Col } from "react-bootstrap";
import { withFormik, Field, ErrorMessage } from 'formik';
import { mentorOptionsFormSchema } from '../../schema/mentorProfileSchema';
import {mentorWizardPropTypes} from "./MentorProfilePropTypes";
import "./mentor-loki-form.css"

const MentorOptionsForm =(props)=>{
  const {
    values,
    onBack,
    isSubmitting,
    handleSubmit,
    cantBack,
    backLabel,
    nextLabel,
  } = props;

  const [formCheckBox,setFormCheckBox] = useState(
    {
      ages:[],
      grades:[],
      mentoringTypes:[],
      genderingTypes:[],
      specialties:[],
    }
  )
  useEffect(()=>{
    setFormCheckBox((prevState)=>{
      const newOptions = {...prevState};
      newOptions.ages = createOptionBoxes("ages",props.formOptions.ages);
      newOptions.grades = createOptionBoxes("grades",props.formOptions.grades);
      newOptions.mentoringTypes = createOptionBoxes("mentoringTypes",props.formOptions.mentoringTypes);
      newOptions.genderTypes = createOptionBoxes("genderTypes",props.formOptions.genderTypes);
      newOptions.specialties = createOptionBoxes("specialties",props.formOptions.specialties);
      return newOptions;
    })
  },[props.formOptions])

  const createOptionBoxes = (arrName, optionArr) =>{
    const mapOptionsToBox = (eachOption) =>{
      return (
      <div className= "form-check" key={`${eachOption.name}_${eachOption.id}`}>
        <label className = "form-check-label">{eachOption.name}</label>
        <Field 
        type="checkbox"
        name= {arrName}
        value= {String(eachOption.id)}
        className="form-check-input"
        />
      </div>)
    }
    const optionCards = optionArr.map(mapOptionsToBox);
    return optionCards;
  }

  useEffect(() => {
    onChange();
  }, [values]);
  const onChange = () => {
      props.onChange(values);
  };
  const onBackClicked = () => {
      onBack(values);
  };

  return (
    <Form onSubmit ={handleSubmit}>
      <Card className = "mentor-card">
        <Card.Header>
          <h1>Mentoring Options</h1>
          <h4>Please provide us more information on the types of mentees you would like to work with.</h4>     
        </Card.Header>
        <Card.Body>
          <Row>
            <Col sm="4">
                <div className="form-group">
                    <label htmlFor="ages">Age Group</label>         
                      {formCheckBox?.ages}
                    <ErrorMessage name="ages" component="div" className="field-error"/>
                  </div> 
                  <hr/>
                  <div className="form-group">
                    <label htmlFor="grades">Grades</label>
                    {formCheckBox?.grades}
                    <ErrorMessage name="grades" component="div" className="field-error"/>
                </div>             
              </Col>
              <Col sm="4">
               <div className="form-group">
                  <label htmlFor="mentoringTypes">Mentoring Type</label>
                  {formCheckBox?.mentoringTypes}
                  <ErrorMessage name="mentoringTypes" component="div" className="field-error"/>
                </div> 
                <hr/>
                <div className="form-group">
                  <label htmlFor="genderTypes">Gender Type</label>
                  {formCheckBox?.genderTypes}
                  <ErrorMessage name="genderTypes" component="div" className="field-error"/>
                </div>
              </Col>
              <Col sm="4">                         
                <div className="form-group">
                  <label htmlFor="specialties">Specialty</label>
                  {formCheckBox?.specialties}
                  <ErrorMessage name="specialties" component="div" className="field-error"/>
                </div>  
              </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <div className="button-group">
              <button
                type="button"
                className = "btn btn-secondary"
                disabled ={isSubmitting || cantBack}
                onClick = {onBackClicked}
                >
                {backLabel}
              </button>
              <button
                type = "submit"
                className = "btn btn-primary"
                disabled={isSubmitting
                  ||!Boolean(values.ages[0]
                    &&values.grades[0]
                    &&values.mentoringTypes[0]
                    &&values.genderTypes[0]
                    &&values.specialties[0])}
              >
                {nextLabel}
              </button>
            </div>
        </Card.Footer>
      </Card>
    </Form>
  );
};

MentorOptionsForm.propTypes = mentorWizardPropTypes;

export default withFormik({
  mapPropsToValues: (props) =>({
    ages: props.formData.ages,
    grades: props.formData.grades,
    mentoringTypes: props.formData.mentoringTypes,
    genderTypes: props.formData.genderTypes,
    specialties: props.formData.genderTypes
  }),
  validationSchema: mentorOptionsFormSchema,
  handleSubmit: (values, {props})=>{
    props.onNext(values);
  }

})(MentorOptionsForm);