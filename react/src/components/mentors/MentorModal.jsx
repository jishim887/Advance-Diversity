import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import { mentorModalPropTypes } from './MentorPropTypes';
import './mentorcard.css';

const MentorModal = (props) => {
    const [options, setOptions] = useState({
        focusAreas: [],
        ages: [],
        grades: [],
        mentoringTypes: [],
        genderTypes: [],
        specialties: [],
    });
    useEffect(() => {
        setOptions((prevState) => {
            const newOptions = { ...prevState };
            newOptions.focusAreas = props.mentor.focusAreas.map(mapOptionToPill);
            newOptions.ages = props.mentor.ages.map(mapOptionToPill);
            newOptions.grades = props.mentor.grades.map(mapOptionToPill);
            newOptions.mentoringTypes = props.mentor.mentoringTypes.map(mapOptionToPill);
            newOptions.genderTypes = props.mentor.genderTypes.map(mapOptionToPill);
            newOptions.specialties = props.mentor.specialties.map(mapOptionToPill);
            return newOptions;
        });
    }, []);
    const mapOptionToPill = (eachOption) => {
        return (
            <span key={eachOption.id} className={`option-pill card-color-${eachOption.id % 4}`}>
                {eachOption.name}
            </span>
        );
    };
    return (
        <Modal centered size="lg" {...props}>
            <Modal.Body>
                <Card>
                    <Card.Body style={{ marginRight: '1%', marginLeft: '1%' }}>
                        <Row className="align-items-center text-center">
                            <Col sm={4}>
                                <img
                                    src={props.mentor.imageUrl}
                                    className="mentor-image rounded-circle avatar-lg img-thumbnail"
                                    alt=""
                                />
                                <h4>
                                    {props.mentor.firstName} {props.mentor.lastName}
                                </h4>
                            </Col>
                            <Col sm={8}>
                                <h5>{props.mentor.description}</h5>
                            </Col>
                        </Row>
                        <hr />
                        <Row className="options-list text-start">
                            <Col sm={3}>
                                <label>Focus Areas</label>
                            </Col>
                            <Col sm={9} className="text-center">
                                {options.focusAreas}
                            </Col>
                        </Row>
                        <hr />
                        <Row className="options-list text-start">
                            <Col sm={3}>
                                <label>Age Groups</label>
                            </Col>
                            <Col sm={9} className="text-center">
                                {options.ages}
                            </Col>
                        </Row>
                        <hr />
                        <Row className="options-list text-start">
                            <Col sm={3}>
                                <label>Grade Groups</label>
                            </Col>
                            <Col sm={9} className="text-center">
                                {options.grades}
                            </Col>
                        </Row>
                        <hr />
                        <Row className="options-list text-start">
                            <Col sm={3}>
                                <label>Mentoring Types</label>
                            </Col>
                            <Col sm={9} className="text-center">
                                {options.mentoringTypes}
                            </Col>
                        </Row>
                        <hr />
                        <Row className="options-list text-start">
                            <Col sm={3}>
                                <label>Gender Types</label>
                            </Col>
                            <Col sm={9} className="text-center">
                                {options.genderTypes}
                            </Col>
                        </Row>
                        <hr />
                        <Row className="options-list text-start">
                            <Col sm={3}>
                                <label>Specialties</label>
                            </Col>
                            <Col sm={9} className="text-center">
                                {options.specialties}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <div className="text-center">
                    <Button onClick={props.onHide}>Close</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};
MentorModal.propTypes = mentorModalPropTypes;
export default MentorModal;
