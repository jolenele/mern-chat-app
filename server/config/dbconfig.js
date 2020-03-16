// Get one
const getOne = (exports.getOne = model => async (req, res) => {
  let id = req.params.id;

  try {
    const item = await model
      .findOneById(id)
      .lean()
      .exec();

    if (!item) {
      res.status(400).end();
    } else {
      res.status(200).json({
        success: true,
        data: item,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Failed to fetch item');
  }
});

// Get all
const getAll = (exports.getAll = model => async (req, res) => {
  try {
    const items = await model
      .find()
      .lean()
      .exec();

    if (!items) {
      res.status(400).end();
    }

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    if (err.name === 'Invalid Credentials') {
      const messages = Object.values(err.errors).map(val => val.message);
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
});

// Get Chat by roomname
const getChatByRoom = (exports.getChatByRoom = model => async (req, res) => {
  let roomname = req.params.roomname;

  try {
    const chats = await model
      .find({
        room: roomname,
      })
      .lean()
      .exec();

    if (!chats) {
      res.status(400).send('Cannot find chat...');
    } else {
      res.status(200).json({
        success: true,
        count: chats.length,
        data: chats,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Failed to fetch chat...');
  }
});

// Add
const add = (exports.add = model => async (req, res) => {
  try {
    const item = await model.create(req.body);
    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (err) {
    if (err.name === 'Invalid Credentials') {
      const messages = Object.values(err.errors).map(val => val.message);
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
});

// Update
const update = (exports.update = model => async (req, res) => {
  try {
    const updatedItem = await model
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        {
          new: true,
        }
      )
      .lean()
      .exec();

    if (!updatedItem) {
      return res.status(401).send('Update failed...');
    }

    res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Update failed...');
  }
});

// Delete
const remove = (exports.remove = model => async (req, res) => {
  try {
    const removedItem = model
      .findOneAndRemove({
        _id: req.params.id,
      })
      .exec();

    if (!removedItem) {
      res.status(400).send('Delete failed...');
    }

    res.status(200).send('Delete successed...');
  } catch (error) {
    console.log(e);
    res.status(400).end();
  }
});

const configs = (exports.controllers = model => ({
  getOne: getOne(model),
  getAll: getAll(model),
  getChatByRoom: getChatByRoom(model),
  add: add(model),
  update: update(model),
  remove: remove(model),
}));
