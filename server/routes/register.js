const app = require('express');
const router = app.Router();
const { check, validationResult } = require('express-validator');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = require('../config/token');

const validators = [
  check('username', 'Name is required').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];

const register = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Check if the user is exist
    let user = await User.findOne({ email }).lean().exec();
    if (user) {
      return res.status(400).json({ err: [{ msg: 'User already exist' }] });
    }

    user = new User({
      username,
      email,
      password,
    });

    const saltedPW = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, saltedPW);

    const savedUser = await user.save();

    if (!savedUser) {
      return res.status(400).json({
        success: false,
        message: 'Email or password is invalid',
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    // Not quite private, I guess
    // let privatekey = "secrettoken";

    jwt.sign(payload, PRIVATE_KEY, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token: token,
        expiresIn: '1h',
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

router.post('/', validators, register);

module.exports = router;
