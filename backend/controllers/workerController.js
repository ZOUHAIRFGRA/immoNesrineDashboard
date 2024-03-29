const Worker = require('../models/Worker');

// Create a new worker
exports.createWorker = async (req, res) => {
  try {
    const { firstName, lastName, CIN, phone } = req.body;

    const worker = new Worker({
      firstName,
      lastName,
      CIN,
      phone
    });

    await worker.save();

    res.status(201).json({ message: 'Worker created successfully', worker });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Retrieve all workers
exports.getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing worker (partial update)
exports.updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, CIN, phone } = req.body;

    let worker = await Worker.findById(id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    if (firstName) worker.firstName = firstName;
    if (lastName) worker.lastName = lastName;
    if (CIN) worker.CIN = CIN;
    if (phone) worker.phone = phone;

    await worker.save();

    res.json({ message: 'Worker updated successfully', worker });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an existing worker
exports.deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;

    let worker = await Worker.findById(id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    await Worker.findByIdAndRemove(id);

    res.json({ message: 'Worker deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Assign worker to project
exports.assignWorkerToProject = async (req, res) => {
    try {
      const { workerId, projectId } = req.body;
  
      // Check if workerId and projectId are provided
      if (!workerId || !projectId) {
        return res.status(400).json({ message: 'Worker ID and Project ID are required' });
      }
  
      // Check if the worker is already assigned to a project
      const existingWorker = await Worker.findOne({ projectId });
      if (existingWorker) {
        return res.status(400).json({ message: 'Worker is already assigned to a project' });
      }
  
      // Assign worker to project
      const worker = await Worker.findByIdAndUpdate(workerId, { projectId }, { new: true });
      if (!worker) {
        return res.status(404).json({ message: 'Worker not found' });
      }
  
      // Update project with the assigned worker
      const project = await Project.findByIdAndUpdate(projectId, { $push: { workers: workerId } }, { new: true });
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.json({ message: 'Worker assigned to project successfully', worker, project });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  