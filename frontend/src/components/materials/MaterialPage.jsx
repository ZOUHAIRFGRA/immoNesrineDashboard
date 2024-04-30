import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TrashIcon,
  PencilIcon,
  XCircleIcon,
  FolderIcon,
} from "@heroicons/react/24/solid";
import MaterialForm from "./MaterialForm";
import Modal from "react-modal";
import Skeleton from "@mui/material/Skeleton";
import MaterialTable from "./MaterialTable";

Modal.setAppElement("#root");

const MaterialsPage = () => {
  const [materials, setmaterials] = useState([]);
  const [materialToEdit, setmaterialToEdit] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchmaterials();
  }, []);

  const fetchmaterials = async () => {
    try {
      const response = await axios.get("/material/materials");
      setmaterials(response.data || []);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching materials:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  const handleAddmaterial = async (formData) => {
    try {
      await axios.post("/material/materials", formData);
      fetchmaterials();
      closeModal();
      alert("material created successfully");
    } catch (error) {
      console.error("Error adding material:", error);
      alert("Failed to create material");
    }
  };

  const handleUpdatematerial = async (formData) => {
    try {
      await axios.put(`/material/materials/${formData._id}`, formData);
      fetchmaterials();
      closeModal();
      alert("material updated successfully");
    } catch (error) {
      console.error("Error updating material:", error);
      alert("Failed to update material");
    }
  };

  const handleDeletematerial = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/material/materials/${id}`);
        setmaterials(materials.filter((material) => material._id !== id));
        alert("material deleted successfully");
      } catch (error) {
        console.error("Error deleting material:", error);
        alert("Failed to delete material");
      }
    }
  };

  const handleEditmaterial = (material) => {
    setmaterialToEdit(material);
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setmaterialToEdit(null);
  };

 
  return (
    <div className="container mx-auto px-4 py-8">
      <>
        <h1 className="text-3xl font-bold mb-8">material Management</h1>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          onClick={openModal}
        >
          Add material
        </button>
        <Modal
          isOpen={modalIsOpen}
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
            <MaterialForm
              onSubmit={
                materialToEdit ? handleUpdatematerial : handleAddmaterial
              }
              materialToEdit={materialToEdit}
            />
          </div>
        </Modal>
        <MaterialTable loading={loading} materials={materials} handleDeletematerial={handleDeletematerial} handleEditmaterial={handleEditmaterial} />
      </>
    </div>
  );
};

export default MaterialsPage;
