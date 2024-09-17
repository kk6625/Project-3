const router = require('express').Router();
const { User } = require('../../models');

// The `/api/users` endpoint

// GET all users
router.get('/', async (req, res) => {
  try {
    const updatedUser = await User.findAll();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByPk(req.params.id);

    if (!updatedUser) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new user
router.post('/', (req, res) => {
  User.create(req.body)
});


// DELETE a user by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedUser) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;