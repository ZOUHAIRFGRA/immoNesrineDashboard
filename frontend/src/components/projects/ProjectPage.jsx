// ProjectPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectTable from './ProjectTable';
import Swal from 'sweetalert2';
import ProjectModal from './ProjectModal';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/project/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleAddProject = async (formData) => {
    try {
      await axios.post('/project/projects', formData);
      fetchProjects();
      Swal.fire('Success', 'Project created successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error adding project:', error);
      Swal.fire('Error', 'Failed to create project', 'error');
    }
  };

  const handleUpdateProject = async (formData) => {
    try {
      await axios.put(`/project/projects/${formData._id}`, formData);
      fetchProjects();
      Swal.fire('Success', 'Project updated successfully', 'success');
      closeModal();
    } catch (error) {
      console.error('Error updating project:', error);
      Swal.fire('Error', 'Failed to update project', 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this project!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`/project/projects/${id}`);
        setProjects(projects.filter(project => project._id !== id));
        Swal.fire('Deleted!', 'Your project has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting project:', error);
        Swal.fire('Error', 'Failed to delete project', 'error');
      }
    }
  };

  const handleEditProject = (project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProjectToEdit(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Project Management</h1>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md" onClick={openModal}>Add Project</button>
      <ProjectModal isOpen={isModalOpen} onClose={closeModal} onSubmit={projectToEdit ? handleUpdateProject : handleAddProject} projectToEdit={projectToEdit} />
      <ProjectTable projects={projects} onDelete={handleDeleteProject} onEdit={handleEditProject} />
    </div>
  );
};

export default ProjectPage;
