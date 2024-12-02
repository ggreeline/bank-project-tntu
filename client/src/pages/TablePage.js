import React, { useCallback, useEffect, useState } from 'react';
import { getUserQueue } from '../apiService';
import Header from '../components/Header';
import QueueCard from '../components/QueueCard';

function TablePage({ setIsLoggedIn }) {
  const [records, setRecords] = useState([]);

  const fetchQueue = useCallback(async () => {
    try {
      const data = await getUserQueue(localStorage.getItem('userPhone'));
      setRecords(data);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  return (
    <div className="homeWrapper">
      <Header
        setIsLoggedIn={setIsLoggedIn}
        label="Список активних записів"
        href={'/'}
        hrefLabel={'Операції'}
      />
      <div className="operationList">
        {records &&
          records.map((record, index) => (
            <QueueCard record={record} key={index} />
          ))}
      </div>
    </div>
  );
}

export default TablePage;
