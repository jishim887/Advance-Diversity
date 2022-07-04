import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { mentorCardPropTypes } from './MentorPropTypes';
import './mentorcard.css';
import informationIcon from '../../assets/images/surveys/information.svg';
import MentorModal from './MentorModal';

const MentorCard = (props) => {
    const [mentor] = useState(props.mentor);
    const [modalShow, setModalShow] = useState(false);
    const onDetailClick = () => {
        setModalShow(true);
    };
    return (
        <Card className="mentor-card text-center">
            <Card.Header className={`mentor-card-header card-color-${props.cardNum}`}></Card.Header>
            <Card.Body>
                <img src={mentor.imageUrl} alt="" className="rounded-circle img-thumbnail mentor-image" />
                <h4>
                    {mentor.firstName} {mentor.lastName}
                </h4>
                <div>
                    {mentor.description.substring(0, 70)}
                    {mentor.description.length >= 70 ? '...' : ''}
                </div>
            </Card.Body>
            <Card.Footer
                className={`align-items-center mentor-card-footer justify-content-center d-flex card-color-${props.cardNum}`}>
                <img src={informationIcon} alt="" width="20" onClick={onDetailClick}></img>
            </Card.Footer>
            <MentorModal mentor={mentor} show={modalShow} onHide={() => setModalShow(false)} />
        </Card>
    );
};
MentorCard.propTypes = mentorCardPropTypes;
export default React.memo(MentorCard);
