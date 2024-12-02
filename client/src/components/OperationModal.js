import React from 'react';
import '../styles//Modal.css';
import TableList from './TableList';

const OperationModal = ({ operation, isOpen, closeModal, showPopup }) => {
  if (!isOpen) return null;
  const formattedOperationCode =
    operation.operationCode > 9
      ? `0${operation.operationCode}`
      : `00${operation.operationCode}`;

  const handleAccept = () => {
    closeModal();
    showPopup();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{operation.name}</h2>
          <button className="close-btn" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="modal-content">
          <p>
            <strong>Код операції:</strong> {formattedOperationCode}
          </p>
          <p>
            <strong>Час на виконання:</strong>{' '}
            {operation.timeToComplete + ' хв.'}
          </p>
          <p>
            <strong>Опис операції:</strong> {operation.description}
          </p>
        </div>
        <TableList
          operationCode={operation.operationCode}
          onClose={handleAccept}
        />
      </div>
    </div>
  );
};

export default OperationModal;
