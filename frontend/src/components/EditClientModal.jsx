// EditClientModal.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const EditClientModal = ({ isOpen, closeModal, client, onUpdate }) => {
  const [updatedClient, setUpdatedClient] = useState({ ...client });

  useEffect(() => {
    setUpdatedClient({ ...client });
  }, [client]);

  const handleNameChange = (e) => {
    setUpdatedClient({ ...updatedClient, name: e.target.value });
  };

  const handleCINChange = (e) => {
    setUpdatedClient({ ...updatedClient, CIN: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setUpdatedClient({ ...updatedClient, phone: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/client/clients/${updatedClient._id}`, updatedClient);
      onUpdate(updatedClient); // Call the onUpdate function with the updated client
      closeModal(); // Close modal after update
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Client"
      className="modal"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Edit Client</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">Name:</label>
            <input
              id="name"
              type="text"
              value={updatedClient.name}
              onChange={handleNameChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cin" className="block text-sm font-semibold mb-2">CIN:</label>
            <input
              id="cin"
              type="text"
              value={updatedClient.CIN}
              onChange={handleCINChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone:</label>
            <input
              id="phone"
              type="text"
              value={updatedClient.phone}
              onChange={handlePhoneChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mr-2"
            >
              Update
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditClientModal;
