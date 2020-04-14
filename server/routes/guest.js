const app = require('express');
const router = app.Router();
const Guest = require('../model/User');
const controllers = require('../controller/crud.controllers');

// /api/user
router.route('/').get(controllers.getAll(Guest));

router
  .route('/:id')
  .get(controllers.getOne(Guest))
  .put(controllers.updateItem(Guest))
  .delete(controllers.removeItem(Guest));

module.exports = router;
