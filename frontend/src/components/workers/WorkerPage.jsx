import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkerForm from './WorkerForm';
import WorkerTable from './WorkerTable';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { XCircleIcon } from '@heroicons/react/24/solid';
import WorkerModal from './WorkerModal';
import Skeleton from '@mui/material/Skeleton';

Modal.setAppElement('#root');

const WorkerPage = () => {
  const [workers, setworkers] = useState([]);
  const [workerToEdit, setworkerToEdit] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
const [loading,setLoading] = useState(true)
  useEffect(() => {
    fetchworkers();
  }, []);

  const fetchworkers = async () => {
    try {
      const response = await axios.get('/worker/workers');
      setworkers(response.data || []);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching workers:', error);
      setLoading(false)
    }
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

  const handleAddworker = async (formData) => {
    try {
      await axios.post('/worker/workers', formData);
      fetchworkers();
      Swal.fire('Success', 'worker created successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error adding worker:', error);
      Swal.fire('Error', 'Failed to create worker', 'error');
    }
  };

  const handleUpdateworker = async (formData) => {
    try {
      await axios.put(`/worker/workers/${formData._id}`, formData);
      fetchworkers();
      Swal.fire('Success', 'worker updated successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error updating worker:', error);
      Swal.fire('Error', 'Failed to update worker', 'error');
    }
  };

  const handleDeleteworker = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this worker!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`/worker/workers/${id}`);
        setworkers(workers.filter(worker => worker._id !== id));
        Swal.fire('Deleted!', 'Your worker has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting worker:', error);
        Swal.fire('Error', 'Failed to delete worker', 'error');
      }
    }
  };

  const handleEditworker = (worker) => {
    setworkerToEdit(worker);
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setworkerToEdit(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Workers Management</h1>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md" onClick={openModal}>Add Worker</button>
      <WorkerModal isOpen={modalIsOpen} onClose={closeModal} onSubmit={workerToEdit ? handleUpdateworker : handleAddworker} workerToEdit={workerToEdit} />

      <WorkerTable loading={loading} renderSkeletonRow={renderSkeletonRow} workers={workers} onDelete={handleDeleteworker} onEdit={handleEditworker} />
    </div>
  );
};

export default WorkerPage;
