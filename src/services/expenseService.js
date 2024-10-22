const { Expense, ExpenseParticipant } = require('../models/Expense');
const { generateExcel } = require('../utils/excel');

const expenseService = {
  async createExpense(expenseData) {
    const { participants, splitType, amount } = expenseData;

    this.validateSplits(splitType, amount, participants);

    const expense = new Expense({
      description: expenseData.description,
      amount,
      paidBy: expenseData.paidBy,
      splitType
    });

    await expense.save();

    await Promise.all(
      participants.map(participant =>
        new ExpenseParticipant({
          expenseId: expense._id,
          userId: participant.userId,
          share: participant.share,
          shareType: splitType === 'PERCENTAGE' ? 'PERCENTAGE' : 'AMOUNT'
        }).save()
      )
    );

    return expense;
  },

  validateSplits(splitType, totalAmount, participants) {
    switch (splitType) {
      case 'EQUAL':
        const equalShare = totalAmount / participants.length;
        participants.forEach(p => p.share = equalShare);
        break;

      case 'EXACT':
        const sumShares = participants.reduce((sum, p) => sum + p.share, 0);
        if (Math.abs(sumShares - totalAmount) > 0.01) {
          throw new Error('Sum of shares must equal total amount');
        }
        break;

      case 'PERCENTAGE':
        const sumPercentages = participants.reduce((sum, p) => sum + p.share, 0);
        if (Math.abs(sumPercentages - 100) > 0.01) {
          throw new Error('Sum of percentages must equal 100');
        }
        participants.forEach(p => {
          p.share = (p.share / 100) * totalAmount;
        });
        break;
    }
  },

  async getAllExpenses() {
    return Expense.find()
      .populate('paidBy', 'name email')
      .populate({
        path: 'participants',
        populate: { path: 'userId', select: 'name email' }
      });
  },

  async getUserExpenses(userId) {
    const expenses = await Expense.find({
      $or: [
        { paidBy: userId },
        { _id: { $in: await ExpenseParticipant.distinct('expenseId', { userId }) } }
      ]
    }).populate('paidBy', 'name email');

    return expenses;
  },

  async generateBalanceSheet(userId) {
    const expenses = await this.getUserExpenses(userId);
    const participants = await ExpenseParticipant.find({
      expenseId: { $in: expenses.map(e => e._id) }
    }).populate('userId', 'name email');

    return generateExcel(expenses, participants);
  }
};

module.exports = { userService, expenseService };