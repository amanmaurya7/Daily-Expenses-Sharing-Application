import { Expense } from '../models/expense.model.js';

export class ExpenseService {
  static async createExpense(expenseData) {
    const { splitType, totalAmount, splits } = expenseData;

    if (splitType === 'PERCENTAGE') {
      const totalPercentage = splits.reduce((sum, split) => sum + (split.percentage || 0), 0);
      if (Math.abs(totalPercentage - 100) > 0.01) {
        throw new Error('Percentages must sum to 100%');
      }
      
      splits.forEach(split => {
        split.amount = (totalAmount * split.percentage) / 100;
      });
    } else if (splitType === 'EXACT') {
      const totalSplit = splits.reduce((sum, split) => sum + split.amount, 0);
      if (Math.abs(totalSplit - totalAmount) > 0.01) {
        throw new Error('Split amounts must equal total amount');
      }
    } else if (splitType === 'EQUAL') {
      const splitAmount = totalAmount / splits.length;
      splits.forEach(split => {
        split.amount = splitAmount;
      });
    }

    return Expense.create(expenseData);
  }

  static async getUserExpenses(userId) {
    return Expense.find({
      $or: [
        { paidBy: userId },
        { 'splits.user': userId }
      ]
    }).populate('paidBy splits.user', 'name email');
  }

  static async getAllExpenses() {
    return Expense.find().populate('paidBy splits.user', 'name email');
  }

  static async generateBalanceSheet(userId) {
    const expenses = await this.getUserExpenses(userId);
    const balances = {};

    expenses.forEach(expense => {
      const paidById = expense.paidBy._id.toString();
      
      expense.splits.forEach(split => {
        const splitUserId = split.user._id.toString();
        
        if (!balances[splitUserId]) balances[splitUserId] = 0;
        if (!balances[paidById]) balances[paidById] = 0;

        if (splitUserId !== paidById) {
          balances[splitUserId] -= split.amount;
          balances[paidById] += split.amount;
        }
      });
    });

    return balances;
  }
}
