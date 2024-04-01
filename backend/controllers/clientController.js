const Client = require('../models/Client');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { name,CIN,phone } = req.body;

    const client = new Client({
      name,
      CIN,
      phone
    });

    await client.save();

    res.status(201).json({ message: 'Client created successfully', client });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Retrieve all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name,CIN,phone } = req.body;

    let client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    if (name) client.name = name;
    if (CIN) client.CIN = CIN;
    if (phone) client.phone = phone;

    await client.save();

    res.json({ message: 'Client updated successfully', client });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an existing client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    let client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await Client.findByIdAndRemove(id);

    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getClientsWithProjects = async (req, res) => {
    try {
      const clients = await Client.find().populate('projects');
      res.json(clients);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };