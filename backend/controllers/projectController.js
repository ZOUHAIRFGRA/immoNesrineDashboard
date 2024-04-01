const Project = require('../models/Project');
const Client = require('../models/Client');

exports.createProject = async (req, res) => {
  try {
    const { name, description, clientId, startDate, endDate, status } = req.body;

    // Check if client exists
    let client;
    if (clientId) {
      client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
    }

    const project = new Project({
      name,
      description,
      client: client ? clientId : null,
      startDate,
      endDate,
      status
    });

    await project.save();

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing project
exports.updateProject = async (req, res) => {
  try {
    const { name, description, clientId, startDate, endDate, status } = req.body;
    const projectFields = {};
    if (name) projectFields.name = name;
    if (description) projectFields.description = description;
    if (clientId) projectFields.client = clientId;
    if (startDate) projectFields.startDate = startDate;
    if (endDate) projectFields.endDate = endDate;
    if (status) projectFields.status = status;

    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if client exists
    if (clientId) {
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }
    }

    project = await Project.findByIdAndUpdate(req.params.id, { $set: projectFields }, { new: true });
    res.json({ message: 'Project updated successfully', project });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Retrieve all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('client');
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Retrieve a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('client');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Delete an existing project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
