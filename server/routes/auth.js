const app = require('express');
const router = app.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../model/User');

router.get('/', async (req, res) => {
  try {
    const user = await await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Erroooooor');
  }
});

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
      if (!user) {
        res.status(400).json({ err: [{ msg: 'Invalid Credentials' }] });
      }

      if (password != user.password) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      res.send('Login successed...');
    } catch (err) {
      console.log(err);
      res.status(500).send('Erroooor Server');
    }
  }
);
module.exports = router;
