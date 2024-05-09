import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddModal = ({ showModal, setShowModal, formData, handleInputChange, handleAddItem, validated, fieldLabels, fieldTypes, formId }) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id={formId} noValidate validated={validated}>
                    {Object.keys(formData).map((fieldName, index) => (
                        <Form.Group className="mb-3" controlId={`${formId}${fieldName}`} key={index}>
                            <Form.Label>{fieldLabels[fieldName]}</Form.Label>
                            <Form.Control
                                type={fieldTypes[fieldName]}
                                placeholder={`Enter ${fieldLabels[fieldName]}`}
                                name={fieldName}
                                value={formData[fieldName]}
                                onChange={handleInputChange}
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
                <Button variant="primary" onClick={handleAddItem}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

AddModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleAddItem: PropTypes.func.isRequired,
    validated: PropTypes.bool.isRequired,
    fieldLabels: PropTypes.object.isRequired,
    fieldTypes: PropTypes.object.isRequired,
    formId: PropTypes.string.isRequired // New prop for form ID
};

export default AddModal;
