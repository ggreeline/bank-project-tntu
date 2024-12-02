import React, { useCallback, useEffect, useState } from 'react';
import { getQueue } from '../apiService';
import {
    convertMinutesTo24hFormat,
    convertToDate,
} from '../helpers/convertTime';
import '../styles/Panel.css';

const PanelPage = () => {
  const [queueEntries, setQueueEntries] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchQueue = useCallback(async () => {
    try {
      const data = await getQueue();
      setQueueEntries(data);
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  return (
    <div className="panel-page">
      <div className="clock">{formatTime(time)}</div>
      <div className="panel-wrapper">
        {queueEntries &&
          queueEntries
            .filter((queue) => {
              const completeTime =
                queue.assignedTime + queue.operation.timeToComplete;
              return convertToDate(completeTime) > new Date();
            })
            .map((record, index) => (
              <div
                key={index}
                className={`record ${convertToDate(record.assignedTime) < new Date() ? 'processing' : ''}`}
              >
                <h1>{record.tableNumber}</h1>
                <h2>{convertMinutesTo24hFormat(record.assignedTime)}</h2>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PanelPage;
