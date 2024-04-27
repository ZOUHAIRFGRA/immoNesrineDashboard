import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ onSubmit, expenseToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: '',
    date: ''
  });

  useEffect(() => {
    if (expenseToEdit) {
      setFormData(expenseToEdit);
    }
  }, [expenseToEdit]);

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
      price: '',
      type: '',
      date: ''
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
        <label htmlFor="price" className="block text-sm font-semibold mb-2">Price:</label>
        <input
          id="price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
  <label htmlFor="type" className="block text-sm font-semibold mb-2">Type:</label>
  <select
    id="type"
    name="type"
    value={formData.type}
    onChange={handleChange}
    className="border border-gray-300 rounded-md px-3 py-2 w-full"
    required
  >
    <option value="">Select Type</option>
    <option value="cash">Cash</option>
    <option value="credit card">Credit Card</option>
  </select>
</div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-semibold mb-2">Date:</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
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
          {expenseToEdit ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;