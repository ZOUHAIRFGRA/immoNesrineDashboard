const Material = require('../models/Material');
const Rent = require('../models/Rent');

// Create a new material tool
exports.createMaterial = async (req, res) => {
  try {
    const { name, quantity, pricePerPiece } = req.body;

    const material = new Material({
      name,
      quantity,
      pricePerPiece
    });

    await material.save();

    res.status(201).json({ message: 'Material tool created successfully', material });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Retrieve all material tools
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing material tool (partial update)
exports.updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, pricePerPiece } = req.body;

    let material = await Material.findById(id);
    if (!material) {
      return res.status(404).json({ message: 'Material tool not found' });
    }

    if (name) material.name = name;
    if (quantity) material.quantity = quantity;
    if (pricePerPiece) material.pricePerPiece = pricePerPiece;

    await material.save();

    res.json({ message: 'Material tool updated successfully', material });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an existing material tool
exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    let material = await Material.findById(id);
    if (!material) {
      return res.status(404).json({ message: 'Material tool not found' });
    }

    await Material.findByIdAndRemove(id);

    res.json({ message: 'Material tool deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

