import express from 'express';
import { ExpenseController } from '../controllers/expense.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', auth, ExpenseController.createExpense);
router.get('/user', auth, ExpenseController.getUserExpenses);
router.get('/all', auth, ExpenseController.getAllExpenses);
router.get('/balance-sheet', auth, ExpenseController.downloadBalanceSheet);

export default router;