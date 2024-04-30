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
import Skeleton from "@mui/material/Skeleton";
import RentTable from "./RentTable";
import RentMaterial from "./RentMaterial";
import Modal from "react-modal";

const RentsList = () => {
  const [rents, setRents] = useState([]);

  useEffect(() => {
    fetchRents();
  }, []);
  const [loading, setLoading] = useState(true);

  const fetchRents = async () => {
    try {
      const response = await axios.get("/rent/rents");
      setRents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch rents:", error);
      setLoading(false);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Rents List</h1>
      <button
        className="bg-blue-500 mb-10 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        onClick={openModal}
      >
        Rent Material
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="material Modal"
        className="modal fixed inset-0 flex items-center justify-center"
        overlayClassName="overlay fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg relative">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={closeModal}
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
          <RentMaterial />
        </div>
      </Modal>
      <RentTable
        loading={loading}
        handleCompleteRent={handleCompleteRent}
        handleCancelRent={handleCancelRent}
        rents={rents}
      />
    </div>
  );
};

export default RentsList;
