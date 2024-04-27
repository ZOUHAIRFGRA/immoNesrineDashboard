import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import Modal component
import AddClientForm from '../clients/AddClient'; // Import AddClientForm component
import {XCircleIcon} from '@heroicons/react/24/solid'; // Import XCircleIcon component
const ProjectForm = ({ onSubmit, projectToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientId: '', // Will store the client ID
    startDate: '',
    endDate: '',
    status: ''
  });

  const [clients, setClients] = useState([]); // State to store the list of clients
  const [isClientModalOpen, setIsClientModalOpen] = useState(false); // State to manage the visibility of the client modal

  useEffect(() => {
    fetchClients(); // Fetch the list of clients when the component mounts
    if (projectToEdit) {
      setFormData(projectToEdit);
    }
  }, [projectToEdit]);

  const fetchClients = async () => {
    try {
      const response = await axios.get('/client/clients'); // Assuming the endpoint to fetch clients is /client/clients
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      description: '',
      clientId: '',
      startDate: '',
      endDate: '',
      status: ''
    });
  };

  const handleCreateClient = () => {
    setIsClientModalOpen(true); // Open the client modal when the user clicks on "Create New Client"
  };

  const handleCloseClientModal = () => {
    setIsClientModalOpen(false); // Close the client modal
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold mb-2">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-semibold mb-2">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-semibold mb-2">Start Date:</label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-semibold mb-2">End Date:</label>
        <input
          id="endDate"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-semibold mb-2">Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="clientId" className="block text-sm font-semibold mb-2">Client:</label>
        <select
          id="clientId"
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        >
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client._id} value={client._id}>{client.name}</option>
          ))}
          <option value="createNewClient">Create New Client</option> {/* Option to create a new client */}
        </select>
        {/* Button to open the client modal */}
        <button
          type="button"
          className="text-blue-500 hover:text-blue-600 focus:outline-none ml-2"
          onClick={handleCreateClient}
        >
          Add New Client
        </button>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          {projectToEdit ? 'Update Project' : 'Add Project'}
        </button>
      </div>
      {/* Client modal */}
      <Modal
        isOpen={isClientModalOpen}
        onRequestClose={handleCloseClientModal}
        contentLabel="Client Modal"
        className="modal fixed inset-0 flex items-center justify-center"
        overlayClassName="overlay fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg relative">
          {/* Close button for the client modal */}
          <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={handleCloseClientModal}>
            <XCircleIcon className="h-6 w-6" />
          </button>
          {/* AddClientForm component */}
          <AddClientForm onClose={handleCloseClientModal} />
        </div>
      </Modal>
    </form>
  );
};

export default ProjectForm;
