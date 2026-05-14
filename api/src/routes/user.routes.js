const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { authenticate, requireAdmin } = require('../middlewares/auth');

router.use(authenticate, requireAdmin);

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
