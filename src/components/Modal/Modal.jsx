import React from 'react';
import '../Modal/modal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete it?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Yes</button>
          <button onClick={onClose} className="cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
