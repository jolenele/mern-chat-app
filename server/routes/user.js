const app = require('express');
const router = app.Router();
const User = require('../model/User');
const controllers = require('../controller/crud.controllers');

// /api/user
router.route('/').get(controllers.getAll(User));

router
  .route('/:id')
  .get(controllers.getOne(User))
  .put(controllers.updateItem(User))
  .delete(controllers.removeItem(User));

module.exports = router;
