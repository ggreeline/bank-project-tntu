import React from 'react';
import '../styles/OperationCard.css';

const OperationCard = ({ operation, onClick }) => {
  const formattedOperationCode =
    operation.operationCode > 9
      ? `0${operation.operationCode}`
      : `00${operation.operationCode}`;
  return (
    <button className="operationCard" onClick={onClick}>
      <h3>{operation.name}</h3>
      <p>
        <span>Код операції: </span> {formattedOperationCode}
      </p>
      <p>
        <span>Час на виконання: </span> {operation.timeToComplete + ' хв.'}
      </p>
      <p>
        <span>Опис операції: </span> {operation.description}
      </p>
    </button>
  );
};

export default OperationCard;
