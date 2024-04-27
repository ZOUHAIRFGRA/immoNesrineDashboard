import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckIcon,
  StopCircleIcon,
  VariableIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import RentMaterialModal from "./RentMaterialModal";

const RentsList = () => {
  const [rents, setRents] = useState([]);

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = async () => {
    try {
      const response = await axios.get("/rent/rents");
      setRents(response.data);
    } catch (error) {
      console.error("Failed to fetch rents:", error);
    }
  };

  const handleCancelRent = async (id) => {
    try {
      await axios.delete(`/rent/rents/${id}`);
      alert("Rent cancelled successfully");
      fetchRents();
    } catch (error) {
      console.error("Failed to cancel rent:", error);
    }
  };

  const handleCompleteRent = async (id) => {
    try {
      await axios.put(`/rent/rents/complete/${id}`);
      alert("Rent completed successfully");
      fetchRents();
    } catch (error) {
      console.error("Failed to complete rent:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Modal opened");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Modal closed");
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Rents List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        onClick={openModal}
      >
        Rent Material
      </button>
      <RentMaterialModal isOpen={isModalOpen} onClose={closeModal} />

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Material</th>
            <th className="py-2 px-4 border">Client</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Start Date</th>
            <th className="py-2 px-4 border">End Date</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rents) &&
            rents.map((rent) => (
              <tr key={rent._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{rent.material.name}</td>
                <td className="py-2 px-4 border">{rent.client.name}</td>
                <td className="py-2 px-4 border">{rent.quantity}</td>
                <td className="py-2 px-4 border">{rent.startDate}</td>
                <td className="py-2 px-4 border">{rent.endDate}</td>
                <td className="py-2 px-4 border">{rent.status}</td>
                <td className="py-2 px-4 border">
                  {rent.status === "Active" && (
                    <>
                      <button
                        onClick={() => handleCancelRent(rent._id)}
                        className="mr-2 text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleCompleteRent(rent._id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  {rent.status !== "Active" && (
                    <CheckIcon className="h-5 w-5 text-gray-400" />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentsList;
