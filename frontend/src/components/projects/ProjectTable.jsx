// ProjectTable.js
import React from "react";
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

const ProjectTable = ({ projects, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              End Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {project.name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {project.description}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {project.client ? project.client.name : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {new Date(project.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {new Date(project.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {project.status}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <button
                  onClick={() => onEdit(project)}
                  className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline ml-2"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(project._id)}
                  className="text-red-600 hover:text-red-900 focus:outline-none focus:underline ml-2"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
