// AssignWorkerPrj.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignWorkerPrj = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    workerId: "",
    projectId: "",
  });
  const [workers, setworkers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchworkers();
    fetchProjects();
  }, []);

  const fetchworkers = async () => {
    try {
      const response = await axios.get("/worker/workers");
      setworkers(response.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/project/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axios.post("/worker/workers/assign-project", formData);
    } catch (error) {
      console.error("Error assigning projects:", error);
    }
    setFormData({
      workerId: "",
      projectId: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="workerId"
          className="block text-sm font-semibold mb-2"
        >
          Select worker:
        </label>
        <select
          id="workerId"
          name="workerId"
          value={formData.workerId}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        >
          <option value="">Select worker</option>
          {workers.map((worker) => (
            <option
              key={worker._id}
              value={worker._id}
            >{`${worker.firstName} ${worker.lastName}`}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="projectId" className="block text-sm font-semibold mb-2">
          Select Project:
        </label>
        <select
          id="projectId"
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Assign Project
        </button>
      </div>
    </form>
  );
};

export default AssignWorkerPrj;
