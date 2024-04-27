import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Skeleton from '@mui/material/Skeleton';
Modal.setAppElement('#root');

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
const [loading,setLoading] = useState(true)
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/employee/employees');
      setEmployees(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false)
    }
  };

  const handleAddEmployee = async (formData) => {
    try {
      await axios.post('/employee/employees', formData);
      fetchEmployees();
      Swal.fire('Success', 'Employee created successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error adding employee:', error);
      Swal.fire('Error', 'Failed to create employee', 'error');
    }
  };

  const handleUpdateEmployee = async (formData) => {
    try {
      await axios.put(`/employee/employees/${formData._id}`, formData);
      fetchEmployees();
      Swal.fire('Success', 'Employee updated successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error updating employee:', error);
      Swal.fire('Error', 'Failed to update employee', 'error');
    }
  };

  const handleDeleteEmployee = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`/employee/employees/${id}`);
        setEmployees(employees.filter(employee => employee._id !== id));
        Swal.fire('Deleted!', 'Your employee has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting employee:', error);
        Swal.fire('Error', 'Failed to delete employee', 'error');
      }
    }
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEmployeeToEdit(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Employee Management</h1>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md" onClick={openModal}>Add Employee</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Employee Modal"
        className="modal fixed inset-0 flex items-center justify-center"
        overlayClassName="overlay fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg relative">
          <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={closeModal}>
            <XCircleIcon className="h-6 w-6" />
          </button>
          <EmployeeForm onSubmit={employeeToEdit ? handleUpdateEmployee : handleAddEmployee} employeeToEdit={employeeToEdit} />
        </div>
      </Modal>
      <EmployeeTable loading={loading} employees={employees} onDelete={handleDeleteEmployee} onEdit={handleEditEmployee} />
    </div>
  );
};

export default EmployeePage;
