const Rent = require('../models/Rent');
const Material = require('../models/Material');
// Get all rents
exports.getRents = async (req, res) => {
    try {
      const rents = await Rent.find();
      res.json(rents);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
// Rent a material tool
exports.rentMaterial = async (req, res) => {
    try {
      const { materialId, clientId, quantity, startDate, endDate } = req.body;
  
      const material = await Material.findById(materialId);
      if (!material) {
        return res.status(404).json({ message: 'Material tool not found' });
      }
  
      if (material.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough quantity available for rent' });
      }
  
      material.quantity -= quantity;
      if (material.quantity === 0) {
        material.status = 'Out of Stock';
      }
  
      await material.save();
  
      const totalPrice = quantity * material.pricePerPiece;
  
      const rent = new Rent({
        material: materialId,
        client: clientId,
        quantity,
        pricePerPiece: material.pricePerPiece,
        totalPrice,
        startDate,
        endDate
      });
  
      await rent.save();
  
      res.status(201).json({ message: 'Material tool rented successfully', rent });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  // Cancel a rent
  exports.cancelRent = async (req, res) => {
      try {
        const { id } = req.params;
    
        let rent = await Rent.findById(id);
        if (!rent) {
          return res.status(404).json({ message: 'Rent not found' });
        }
    
        // Change status to cancelled
        rent.status = 'Cancelled';
        await rent.save();
    
        // Increase material quantity
        const material = await Material.findById(rent.material);
        if (!material) {
          return res.status(404).json({ message: 'Material tool not found' });
        }
        material.quantity += rent.quantity;
        await material.save();
    
        res.json({ message: 'Rent cancelled successfully', rent });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
    
    // Complete a rent
    exports.completeRent = async (req, res) => {
      try {
        const { id } = req.params;
    
        let rent = await Rent.findById(id);
        if (!rent) {
          return res.status(404).json({ message: 'Rent not found' });
        }
    
        // Change status to completed
        rent.status = 'Completed';
        await rent.save();
    
        // Increase material quantity
        const material = await Material.findById(rent.material);
        if (!material) {
          return res.status(404).json({ message: 'Material tool not found' });
        }
        material.quantity += rent.quantity;
        await material.save();
    
        res.json({ message: 'Rent completed successfully', rent });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
    