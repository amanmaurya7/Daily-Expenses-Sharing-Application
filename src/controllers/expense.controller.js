import { ExpenseService } from '../services/expense.service.js';
import PDFDocument from 'pdfkit';

export class ExpenseController {
  static async createExpense(req, res) {
    try {
      const expenseData = {
        ...req.body,
        paidBy: req.user._id
      };
      const expense = await ExpenseService.createExpense(expenseData);
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserExpenses(req, res) {
    try {
      const expenses = await ExpenseService.getUserExpenses(req.user._id);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllExpenses(req, res) {
    try {
      const expenses = await ExpenseService.getAllExpenses();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async downloadBalanceSheet(req, res) {
    try {
      const balances = await ExpenseService.generateBalanceSheet(req.user._id);
      
      const doc = new PDFDocument();
      doc.pipe(res);
      
      doc.fontSize(20).text('Balance Sheet', { align: 'center' });
      doc.moveDown();
      
      Object.entries(balances).forEach(([userId, amount]) => {
        const text = amount >= 0 
          ? `User ${userId} owes you: $${amount.toFixed(2)}`
          : `You owe User ${userId}: $${Math.abs(amount).toFixed(2)}`;
        doc.fontSize(12).text(text);
        doc.moveDown();
      });
      
      doc.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}