import React from 'react';
import { Card, Pagination } from 'react-bootstrap';

const surveyPagination = () => {
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === 2}>
                {number}
            </Pagination.Item>
        );
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Pagination className="pagination-rounded">
                        <Pagination.Prev />
                        {items}
                        <Pagination.Next />
                    </Pagination>
                </Card.Body>
            </Card>
        </>
    );
};
export default surveyPagination;
