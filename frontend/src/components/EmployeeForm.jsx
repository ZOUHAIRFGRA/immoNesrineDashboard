// EmployeeForm.js
import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ onSubmit, employeeToEdit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    CIN: '',
    phone: ''
  });

  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    }
  }, [employeeToEdit]);

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
      firstName: '',
      lastName: '',
      CIN: '',
      phone: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-semibold mb-2">First Name:</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-semibold mb-2">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="CIN" className="block text-sm font-semibold mb-2">CIN:</label>
        <input
          id="CIN"
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
          {employeeToEdit ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
