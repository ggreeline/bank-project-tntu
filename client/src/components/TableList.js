import React, { useCallback, useEffect, useState } from 'react';
import { getTablesForOperation, postQueueEntry } from '../apiService';
import { convertMinutesTo24hFormat } from '../helpers/convertTime';
import '../styles/TableList.css';

const TableList = ({ operationCode, onClose }) => {
  const [tables, setTables] = useState([]);

  const fetchTables = useCallback(async () => {
    try {
      const data = await getTablesForOperation(operationCode);
      setTables(data);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  const handleTableSelect = async (tableNumber) => {
    await postQueueEntry(
      localStorage.getItem('userName'),
      localStorage.getItem('userPhone'),
      operationCode,
      tableNumber,
    );
    onClose();
  };

  return (
    <div className="tables">
      {tables.map((table, index) => (
        <button
          key={index}
          className="table"
          onClick={() => handleTableSelect(table.tableNumber)}
        >
          <span className="number">{table.tableNumber}</span>
          <span>
            {' ' + convertMinutesTo24hFormat(table.nextAvailableTime)}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TableList;
