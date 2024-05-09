import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EditModal = ({
    showModal,
    setShowModal,
    editFormData,
    handleEditInputChange,
    handleUpdateItem,
    validated,
    fieldLabels,
    fieldTypes
}) => {
    const [formData, setFormData] = useState(editFormData);

    useEffect(() => {
        setFormData(editFormData);
    }, [editFormData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateItem(formData);
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {Object.keys(formData).map((fieldName, index) => (
                        <Form.Group className="mb-3" controlId={`formEdit${fieldName}`} key={index}>
                            <Form.Label>{fieldLabels[fieldName]}</Form.Label>
                            <Form.Control
                                type={fieldTypes[fieldName]}
                                placeholder={`Enter ${fieldLabels[fieldName]}`}
                                name={fieldName}
                                value={formData[fieldName]}
                                onChange={handleEditInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">{`${fieldLabels[fieldName]} is required.`}</Form.Control.Feedback>
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-white border" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

EditModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    editFormData: PropTypes.object.isRequired,
    handleEditInputChange: PropTypes.func.isRequired,
    handleUpdateItem: PropTypes.func.isRequired,
    validated: PropTypes.bool.isRequired,
    fieldLabels: PropTypes.objectOf(PropTypes.string).isRequired,
    fieldTypes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default EditModal;
