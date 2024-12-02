import React, { useCallback, useEffect, useState } from 'react';
import { getAllOperations } from '../apiService';
import Header from '../components/Header';
import OperationCard from '../components/OperationCard';
import OperationModal from '../components/OperationModal';
import Popup from '../components/Popup';
import '../styles/HomePage.css';

function HomePage({ setIsLoggedIn }) {
  const [operations, setOperations] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOperations = useCallback(async () => {
    try {
      const data = await getAllOperations();
      setOperations(data);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  useEffect(() => {
    fetchOperations();
  }, [fetchOperations]);

  const openModal = (operation) => {
    setSelectedOperation(operation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOperation(null);
  };

  const [isPopupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 2200);
  };

  return (
    <div className="homeWrapper">
      <Header
        setIsLoggedIn={setIsLoggedIn}
        label={'Оберіть одну із доступних операцій'}
        href={'/records'}
        hrefLabel={'Записи'}
      />
      <div className="operationList">
        {operations.length === 0 ? (
          <div className="noOperations">No operations available</div>
        ) : (
          operations.map((operation, index) => (
            <OperationCard
              operation={operation}
              onClick={() => openModal(operation)}
              key={index}
            />
          ))
        )}
      </div>
      <OperationModal
        operation={selectedOperation}
        isOpen={isModalOpen}
        closeModal={closeModal}
        showPopup={showPopup}
      />
      {isPopupVisible && <Popup />}
    </div>
  );
}

export default HomePage;
