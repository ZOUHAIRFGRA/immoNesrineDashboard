import React, { useState, useEffect } from 'react';

const MaterialForm = ({ onSubmit, materialToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    pricePerPiece: ''
    
  });

  useEffect(() => {
    if (materialToEdit) {
      setFormData(materialToEdit);
    }
  }, [materialToEdit]);

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
      quantity: '',
      pricePerPiece: ''
      
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
        <label htmlFor="quantity" className="block text-sm font-semibold mb-2">quantity:</label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>
      

      <div className="mb-4">
        <label htmlFor="pricePerPiece" className="block text-sm font-semibold mb-2">pricePerPiece:</label>
        <input
          id="pricePerPiece"
          type="number"
          name="pricePerPiece"
          value={formData.pricePerPiece}
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
          {materialToEdit ? 'Update material' : 'Add material'}
        </button>
      </div>
    </form>
  );
};

export default MaterialForm;