import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import Skeleton from '@mui/material/Skeleton';
const EmployeeTable = ({ employees,loading, onDelete, onEdit }) => {
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
              First Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              CIN
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Projects</th>
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
            Array.isArray(employees) &&
          employees.map((employee) => (
            <tr key={employee._id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {employee.firstName}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {employee.lastName}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{employee.CIN}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{employee.phone}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {employee.projects.length > 0 ? (
                  <Link
                    to={`/projects/${employee.projects[0]._id}`} // Assuming there's only one project per employee
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                  >
                    {employee.projects.map((project, index) => (
                      <React.Fragment key={project._id}>
                        <span>{project.name}</span>
                        {index < employee.projects.length - 1 && ', '}
                      </React.Fragment>
                    ))}
                  </Link>
                ) : (
                  <span>No projects</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <button
                  onClick={() => onEdit(employee)}
                  className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline ml-2"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(employee._id)}
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

export default EmployeeTable;
