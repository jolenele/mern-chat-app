const app = require('express');
const router = app.Router();
const Message = require('../model/Message');
const controllers = require('../controller/crud.controllers');

// /api/chats
router
  .route('/')
  .get(controllers.getAll(Message))
  .post(controllers.addItem(Message));

// /api/chats/:id
router
  .route('/:id')
  .get(controllers.getOne(Message))
  .put(controllers.updateItem(Message))
  .delete(controllers.removeItem(Message));

module.exports = router;
