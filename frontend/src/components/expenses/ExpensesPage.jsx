import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TrashIcon,
  PencilIcon,
  XCircleIcon,
  FolderIcon,
} from "@heroicons/react/24/solid";
import ExpenseForm from "./ExpenseForm";
import Modal from "react-modal";
import Skeleton from "@mui/material/Skeleton";
import ExpenseTable from "./ExpenseTable";

Modal.setAppElement("#root");

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("/expense/expenses");
      setExpenses(response.data || []);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  const handleAddExpense = async (formData) => {
    try {
      await axios.post("/expense/expenses", formData);
      fetchExpenses();
      closeModal();
      alert("Expense created successfully");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to create expense");
    }
  };

  const handleUpdateExpense = async (formData) => {
    try {
      await axios.put(`/expense/expenses/${formData._id}`, formData);
      fetchExpenses();
      closeModal();
      alert("Expense updated successfully");
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense");
    }
  };

  const handleDeleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/expense/expenses/${id}`);
        setExpenses(expenses.filter((expense) => expense._id !== id));
        alert("Expense deleted successfully");
      } catch (error) {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense");
      }
    }
  };

  const handleDownloadCsv = async () => {
    try {
      const response = await axios.get("/expense/expenses/export-to-csv", {
        responseType: "blob", // Set responseType to 'blob' to receive binary data
      });

      // Create a Blob object from the PDF data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary URL for the Blob
      const pdfUrl = window.URL.createObjectURL(pdfBlob);

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "report.pdf"; // Set the file name
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handleEditExpense = (expense) => {
    setExpenseToEdit(expense);
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setExpenseToEdit(null);
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
        <h1 className="text-3xl font-bold mb-8">Expense Management</h1>
        <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-1 rounded-md mr-4"
          onClick={handleDownloadCsv}
        >
          <div className=" inline-flex"><FolderIcon className="h-4 w-4" /> Export to CSV</div>
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 h-12 rounded-md"
          onClick={openModal}
        >
          Add Expense
        </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Expense Modal"
          className="modal fixed inset-0 flex items-center justify-center"
          overlayClassName="overlay fixed inset-0 bg-gray-800 bg-opacity-75"
        >
           <div className="bg-white p-8 rounded-lg shadow-lg relative">
          <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 " onClick={closeModal}>
            <XCircleIcon className="h-6 w-6" />
          </button>
            <ExpenseForm
              onSubmit={expenseToEdit ? handleUpdateExpense : handleAddExpense}
              expenseToEdit={expenseToEdit}
            />
          </div>
        </Modal>
       <ExpenseTable loading={loading} expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditExpense} />
      </>
    </div>
  );
};

export default ExpensesPage;
