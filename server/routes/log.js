const app = require('express');
const router = app.Router();
const Log = require('../model/Log');

router.get('/:id', async (req, res) => {
  try {
    const log = await Log.findById(req.log.id);
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const log = await Log.find(req);
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
