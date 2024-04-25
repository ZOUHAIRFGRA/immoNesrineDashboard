import axios from 'axios';
import React, { useState } from 'react';

const AddClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    CIN: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/client/clients`,
      formData
    );

    console.log("Client created:", response.data);
    // Reset the form fields
    setFormData({
      name: '',
      CIN: '',
      phone: ''
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
        <label htmlFor="cin" className="block text-sm font-semibold mb-2">CIN:</label>
        <input
          id="cin"
          type="text"
          name="CIN"
          value={formData.CIN}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone:</label>
        <input
          id="phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Add Client
        </button>
      </div>
    </form>
  );
};

export default AddClientForm;
