import React, { useCallback, useEffect, useState } from 'react';
import { getQueue, removeFromQueue } from '../apiService';
import Header from '../components/Header';
import QueueCard from '../components/QueueCard';

function AdminPage({ setIsLoggedIn }) {
  const [queueEntries, setQueueEntries] = useState([]);
  const fetchQueue = useCallback(async () => {
    try {
      const data = await getQueue();
      setQueueEntries(data);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  const onClick = useCallback(
    (id) => {
      if (window.confirm('Дійсно хочете видалити цей запис?')) {
        setQueueEntries(queueEntries.filter((item) => item._id !== id));
        removeFromQueue(id);
      }
    },
    [queueEntries],
  );

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  return (
    <div className="homeWrapper">
      <Header
        setIsLoggedIn={setIsLoggedIn}
        label={'Панель адміністрування'}
        href={'/'}
        hrefLabel={'Головна'}
      />
      <div className="operationList">
        {queueEntries &&
          queueEntries.map((entry, index) => (
            <QueueCard
              record={entry}
              onClick={() => onClick(entry._id)}
              admin={true}
              key={index}
            />
          ))}
      </div>
    </div>
  );
}

export default AdminPage;
