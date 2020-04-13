const app = require('express');
const router = app.Router();
const Room = require('../model/Room');

router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.room.id);
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const room = await Room.find(req);
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
