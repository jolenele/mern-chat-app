const app = require('express');
const router = app.Router();
const Log = require('../model/Log');

router.route('/:id').get((req, res) => {
  Log.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route('/').get((req, res) => {
  Log.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
