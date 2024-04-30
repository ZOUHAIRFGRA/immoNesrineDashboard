// RentMaterialModal.js
import React from 'react';
import Modal from 'react-modal';
import RentMaterial from './RentMaterial';
import { XCircleIcon } from '@heroicons/react/24/solid';



const RentMaterialModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Rent Modal"
      className="modal fixed inset-0 flex items-center justify-center"
      overlayClassName="overlay fixed inset-0 bg-gray-800 bg-opacity-75"
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
