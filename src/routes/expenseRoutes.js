const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { auth, validate } = require('../middleware/auth');
const expenseController = require('../controllers/expenseController');

router.post('/',
  auth,
  [
    body('description').trim().notEmpty(),
    body('amount').isNumeric().toFloat(),
    body('splitType').isIn(['EQUAL', 'EXACT', 'PERCENTAGE']),
    body('participants').isArray().notEmpty(),
    validate
  ],
  expenseController.createExpense
);

router.get('/', auth, expenseController.getExpenses);
router.get('/user', auth, expenseController.getUserExpenses);
router.get('/balance-sheet', auth, expenseController.downloadBalanceSheet);

module.exports = router;