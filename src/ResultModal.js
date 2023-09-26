// src/ResultModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ResultModal({ show, hasWon, onClose }) {

    const message = hasWon ? 'You have won!' : 'You have lost'

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Game Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultModal;