import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import Skeleton from "@mui/material/Skeleton";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
const RentTable = ({ rents, loading, handleCancelRent, handleCompleteRent }) => {
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
      </tr>
    );
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              rent
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Quantity
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
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
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
            Array.isArray(rents) &&
            rents.map((rent) => (
              <tr key={rent._id}>
                <td className="px-6 py-4 whitespace-no-wrap">{rent.material.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {rent.client.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {rent.quantity}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {rent.startDate}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {rent.endDate}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {rent.status}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                {rent.status === "Active" && (
                    <>
                      <button
                        onClick={() => handleCancelRent(rent._id)}
                        className="mr-2 text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleCompleteRent(rent._id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  {rent.status !== "Active" && (
                    <CheckIcon className="h-5 w-5 text-gray-400" />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RentTable;
