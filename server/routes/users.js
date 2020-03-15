const app = require('express');
const router = app.Router();
const { check, validationResult } = require('express-validator');
const User = require('../model/User');
router.post(
  '/',
  [
    check('username', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ err: err.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if the user is exist
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ err: [{ msg: 'User already exist' }] });
      }

      user = new User({
        username,
        email,
        password,
      });

      await user.save();

      res.send('User registered...');
    } catch (err) {
      console.log(err);
      res.status(500).send('Erroooor Server');
    }
  }
);
module.exports = router;