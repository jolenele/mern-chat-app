const app = require('express');
const router = app.Router();
const Log = require('../model/Log');
const controllers = require('../controller/crud.controllers');

// /api/log
router.route('/').get(controllers.getAll(Log)).post(controllers.addItem(Log));

// /api/log/:id
router
  .route('/:id')
  .get(controllers.getOne(Log))
  .put(controllers.updateItem(Log))
  .delete(controllers.removeItem(Log));

module.exports = router;
