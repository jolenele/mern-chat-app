// Get one item
const getOne = (model) => async (req, res) => {
  try {
    const id = req.params.id;
    const item = await model.findById(id).lean().exec();
    if (!item) {
      return res.status(400).json({
        success: false,
        message: 'Item not found',
      });
    }
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Erroooooor',
    });
  }
};

// Get all items
const getAll = (model) => async (req, res) => {
  try {
    const items = await model.find();
    if (!items) {
      return res.status(400).json({
        success: false,
        message: 'Item not found',
      });
    }
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Errorrrrr',
    });
  }
};

// Add Item
const addItem = (model) => async (req, res) => {
  try {
    const addedItem = await model.create(req.body);
    res.status(201).json({
      success: true,
      data: addedItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Update Item
const updateItem = (model) => async (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = await model
      .findOneAndUpdate({ _id: id }, req.body)
      .lean()
      .exec();
    if (!updatedItem) {
      return res.status(400).json({
        success: false,
        message: 'Failed to update item',
      });
    }
    res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      console.log(messages);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// Remove Item
const removeItem = (model) => async (req, res) => {
  try {
    const id = req.params.id;
    const removedItem = await model.findOneAndRemove({ _id: id }).exec();
    if (!removedItem) {
      res.status(400).send('Failed to remove item');
    }
    res.status(200).send('Successfully removed item');
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Export
module.exports = {
  getOne: getOne,
  getAll: getAll,
  addItem: addItem,
  updateItem: updateItem,
  removeItem: removeItem,
};
