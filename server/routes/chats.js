const app = require('express');
const router = app.Router();
const Message = require('../model/Message');

router.route('/:id').get((req, res) => {
  Message.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.route('/').get((req, res) => {
  Message.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
