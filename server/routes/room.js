const app = require('express');
const router = app.Router();
const Room = require('../model/Room');
const controllers = require('../controller/crud.controllers');

// /api/room
router.route('/').get(controllers.getAll(Room)).post(controllers.addItem(Room));

// /api/room/:id
router
  .route('/:id')
  .get(controllers.getOne(Room))
  .put(controllers.updateItem(Room))
  .delete(controllers.removeItem(Room));

module.exports = router;
