import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.241:3001';

export const getAllOperations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/operation/`);
    return response.data;
  } catch (error) {
    console.warn('Error during fetching:', error);
    throw error;
  }
};

export const getUserQueue = async (userPhone) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/queue/${userPhone}`);
    return response.data;
  } catch (error) {
    console.warn('Error during fetching:', error);
    throw error;
  }
};

export const removeFromQueue = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/queue/${id}`);
  } catch (error) {
    console.warn('Error during deleting:', error);
    throw error;
  }
};

export const getQueue = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/queue/`);
    return response.data;
  } catch (error) {
    console.warn('Error during fetching:', error);
    throw error;
  }
};

export const getTablesForOperation = async (operationCode) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/tables/available/${operationCode}`,
    );
    return response.data;
  } catch (error) {
    console.warn('Error during fetching:', error);
    throw error;
  }
};

export const postQueueEntry = async (
  customerName,
  phoneNumber,
  operationCode,
  tableNumber,
) => {
  try {
    await axios.post(`${API_BASE_URL}/queue/`, {
      customerName: customerName,
      phoneNumber: phoneNumber,
      operationCode: operationCode,
      tableNumber: tableNumber,
    });
  } catch (error) {
    console.warn('Error during posting:', error);
    throw error;
  }
};
