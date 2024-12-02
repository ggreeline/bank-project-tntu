import React from 'react';
import { convertMinutesTo24hFormat } from '../helpers/convertTime';

const QueueCard = ({ record, admin = false, onClick }) => {
  const localeConfig = {
    locale: 'en-US',
    options: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
  };
  return (
    <button className="operationCard" onClick={onClick}>
      <div className="queue-card-header">
        <h3>{record.operation.name}</h3>
        <span className="queue-time-table">
          <h5>{convertMinutesTo24hFormat(record.assignedTime)}</h5>
          <h4>№{record.tableNumber}</h4>
        </span>
      </div>
      {admin && (
        <p>
          <span>ПІБ клієнта: </span> {record.customerName}
        </p>
      )}
      <p>
        <span>Необхідний час: </span> {record.operation.timeToComplete + ' хв.'}
      </p>
      <p>
        <span>Створено: </span>{' '}
        {new Date(record.createdAt).toLocaleString(
          localeConfig.locale,
          localeConfig.options,
        )}
      </p>
    </button>
  );
};

export default QueueCard;
