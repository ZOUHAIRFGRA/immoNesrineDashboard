import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import Skeleton from '@mui/material/Skeleton';
const ExpenseTable = ({ expenses,loading, onDelete, onEdit }) => {
  const renderSkeletonRow = () => {
    return (
      <tr>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={81} />
        </td>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={81} />
        </td>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={81} />
        </td>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={81} />
        </td>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={81} />
        </td>
       <td className="px-6 py-4 whitespace-no-wrap">
          <Skeleton variant="text" width={81} />
        </td>
      </tr>
    );
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
           
            <th className="px-6 py-3 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
        {loading ? (
            <>
              {renderSkeletonRow()}
              {renderSkeletonRow()}
              {renderSkeletonRow()}
              {renderSkeletonRow()}
              {renderSkeletonRow()}
              {renderSkeletonRow()}
              {/* Add more skeleton rows as needed */}
            </>
          ) : (
            Array.isArray(expenses) &&
          expenses.map((expense) => (
            <tr key={expense._id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {expense.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {expense.price}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{expense.type}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{expense.date}</td>
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <button
                  onClick={() => onEdit(expense)}
                  className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline ml-2"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(expense._id)}
                  className="text-red-600 hover:text-red-900 focus:outline-none focus:underline ml-2"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
