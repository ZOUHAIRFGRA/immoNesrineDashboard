// EmployeeTable.js
import React from 'react';

const EmployeeTable = ({ employees, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">CIN</th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-no-wrap">{employee.firstName}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{employee.lastName}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{employee.CIN}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{employee.phone}</td>
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <button onClick={() => onEdit(employee)} className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline">Edit</button>
                <button onClick={() => onDelete(employee._id)} className="text-red-600 hover:text-red-900 focus:outline-none focus:underline ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
