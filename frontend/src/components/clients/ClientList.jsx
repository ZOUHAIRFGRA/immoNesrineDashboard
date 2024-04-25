// ClientList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable, usePagination } from "react-table";
import EditClientModal from "./EditClientModal"; // Import the EditClientModal component
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";


const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal open/close
  const [selectedClient, setSelectedClient] = useState(null); // State for storing the selected client for editing

  useEffect(() => {
    axios
      .get("/client/clients")
      .then((res) => {
        setClients(res.data);
        console.log(res.data)
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // Function to open the modal
  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  // Function to handle editing a client
  const handleEdit = (client) => {
    openModal(client);
  };

  // Function to handle deleting a client
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this client!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/client/clients/${id}`);
          setClients(clients.filter((client) => client._id !== id));
          Swal.fire("Deleted!", "Your client has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire(
            "Error!",
            "An error occurred while deleting the client.",
            "error"
          );
        }
      }
    });
  };

  const data = React.useMemo(() => clients, [clients]);

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "CIN", accessor: "CIN" },
      { Header: "Phone", accessor: "phone" },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value, row }) => (
          <div className="flex justify-end">
            <button
              onClick={() => handleEdit(row.original)}
              className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline mr-4"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(value)}
              className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    usePagination
  );

  const updateClient = (updatedClient) => {
    // Find the index of the updated client in the clients array
    const index = clients.findIndex((c) => c._id === updatedClient._id);
    // Create a new array with the updated client
    const updatedClients = [...clients];
    updatedClients[index] = updatedClient;
    // Update the state with the new array of clients
    setClients(updatedClients);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-no-wrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div className="flex">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="py-2 px-4 rounded-l-md bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:bg-gray-300 focus:text-gray-800"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:bg-gray-300 focus:text-gray-800"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:bg-gray-300 focus:text-gray-800"
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="py-2 px-4 rounded-r-md bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:bg-gray-300 focus:text-gray-800"
          >
            {">>"}
          </button>
        </div>
        <div>
          <span className="text-gray-700">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
        </div>
      </div>
      <EditClientModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        client={selectedClient}
        onUpdate={updateClient}
      />
    </div>
  );
};

export default ClientList;
