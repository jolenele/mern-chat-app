const app = require('express');
const router = app.Router();
const Room = require('../model/Room');

router.route('/:id').get((req, res) => {
  Room.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route('/').get((req, res) => {
  Room.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
