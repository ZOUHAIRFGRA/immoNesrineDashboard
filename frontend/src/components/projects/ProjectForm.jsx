// ProjectForm.js
import React, { useState, useEffect } from 'react';

const ProjectForm = ({ onSubmit, projectToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientId: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData(projectToEdit);
    }
  }, [projectToEdit]);

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
        <label htmlFor="clientId" className="block text-sm font-semibold mb-2">Client ID:</label>
        <input
          id="clientId"
          type="text"
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
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
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          {projectToEdit ? 'Update Project' : 'Add Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
