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
import Skeleton from '@mui/material/Skeleton';

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

  const renderSkeletonRow = () => {
    return (
      <tr>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={100} />
        </td>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={100} />
        </td>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={100} />
        </td>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={100} />
        </td>
      </tr>
    );
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
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  quantity
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  pricePerPiece
                </th>
                
                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
            <>
              {renderSkeletonRow()}
              {renderSkeletonRow()}
              {renderSkeletonRow()}
              {/* Add more skeleton rows as needed */}
            </>
          ) : (
            Array.isArray(materials) && materials.map((material) => (
                <tr key={material._id}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {material.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {material.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {material.pricePerPiece}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    <button
                      onClick={() => handleEditmaterial(material)}
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeletematerial(material._id)}
                      className="text-red-600 hover:text-red-900 focus:outline-none focus:underline ml-2"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </>
    
    </div>
  );
};

export default MaterialsPage;
