import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

const WorkerTable = ({
  workers,
  onDelete,
  onEdit,
  loading,
  renderSkeletonRow,
}) => {
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
            Array.isArray(workers) &&
            workers.map((worker) => (
              <tr key={worker._id}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {worker.firstName}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {worker.lastName}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{worker.CIN}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{worker.phone}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {worker.projectId ? (
                    <Link
                      to={`/projects/${worker.projectId._id}`} // Assuming there's only one project per worker
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                    >
                      {worker.projectId.name}
                    </Link>
                  ) : (
                    <span>No project</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <button
                    onClick={() => onEdit(worker)}
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline ml-2"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(worker._id)}
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
    </div>
  );
};

export default WorkerTable;
