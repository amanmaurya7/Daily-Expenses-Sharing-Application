const expenseService = require('../services/expenseService');

const expenseController = {
  async createExpense(req, res) {
    try {
      const expense = await expenseService.createExpense({
        ...req.body,
        paidBy: req.user._id
      });
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getExpenses(req, res) {
    try {
      const expenses = await expenseService.getAllExpenses();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserExpenses(req, res) {
    try {
      const expenses = await expenseService.getUserExpenses(req.user._id);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async downloadBalanceSheet(req, res) {
    try {
      const buffer = await expenseService.generateBalanceSheet(req.user._id);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=balance-sheet.xlsx');
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { userController, expenseController };