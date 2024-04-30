import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RentMaterial = () => {
  const [clients, setClients] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({
    materialId: "",
    clientId: "",
    quantity: "",
    startDate: "",
    endDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
    fetchMaterials();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("/client/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("/material/materials");
      setMaterials(response.data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClientAdd = () => {
    navigate("/addclient");
  };

  const handleMaterialAdd = () => {
    navigate("/addmaterial");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/rent/rents", formData);
      setFormData({
        materialId: "",
        clientId: "",
        quantity: "",
        startDate: "",
        endDate: "",
      });
      fetchMaterials();
      alert("Material rented successfully");
    } catch (error) {
      console.error("Failed to rent material:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="mb-4">Select Client:</label>
        <select
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className="block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          required
        >
          <option value=""></option>
          {Array.isArray(clients) &&
            clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
        </select>
        <button
          type="button"
          onClick={handleClientAdd}
          className="block mt-2 text-blue-500"
        >
          Add Client
        </button>
      </div>
      <div>
        <label className="mb-4">Select Material:</label>
        <select
          name="materialId"
          value={formData.materialId}
          onChange={handleChange}
          className="block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          required
        >
          <option value=""></option>
          {Array.isArray(materials) &&
            materials.map((material) => (
              <option key={material._id} value={material._id}>
                {material.name}
              </option>
            ))}
        </select>
        <button
          type="button"
          onClick={handleMaterialAdd}
          className="block mt-2 text-blue-500"
        >
          Add Material
        </button>
      </div>
      <div>
        <label className="mb-4">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <div>
        <label className="mb-4">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <div>
        <label className="mb-4">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          required
        />
      </div>
      <button
        type="submit"
        className="block w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Rent Material
      </button>
    </form>
  );
};

export default RentMaterial;
