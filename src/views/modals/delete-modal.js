import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import PropTypes from 'prop-types';

const DeleteModal = ({ showModal, setShowModal, handleDeleteItem, itemName }) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <FaExclamationTriangle className="text-danger mx-2 fs-2" />
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {itemName}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-white border" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteItem}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

DeleteModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    itemName: PropTypes.string.isRequired
};

export default DeleteModal;
