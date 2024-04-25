// ProjectModal.js
import React from 'react';
import Modal from 'react-modal';
import ProjectForm from './ProjectForm';
import { XCircleIcon } from '@heroicons/react/24/solid';

const ProjectModal = ({ isOpen, onClose, onSubmit, projectToEdit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Project Modal"
      className="modal fixed inset-0 flex items-center justify-center"
      overlayClassName="overlay fixed inset-0 bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <XCircleIcon className="h-6 w-6" />
        </button>
        <ProjectForm onSubmit={onSubmit} projectToEdit={projectToEdit} />
      </div>
    </Modal>
  );
};

export default ProjectModal;
