// RentMaterialModal.js
import React from 'react';
import Modal from 'react-modal';
import RentMaterial from './RentMaterial';
import { XCircleIcon } from '@heroicons/react/24/solid';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70%', // Adjust the width as needed
    maxHeight: '80vh', // Set maximum height and enable scrolling
    overflowY: 'auto', // Enable vertical scrolling
    border: 'none', // Remove border from the content
    borderRadius: '8px', // Add border-radius to the content
    padding: '2em', // Remove padding to avoid extra space
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add box shadow for depth
  },
};

const RentMaterialModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Rent Modal"
      style={customStyles}
    >
      <div className="bg-white rounded-lg overflow-hidden">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <XCircleIcon className="h-6 w-6" />
        </button>
        <RentMaterial onSubmit={onSubmit}  />
      </div>
    </Modal>
  );
};

export default RentMaterialModal;
