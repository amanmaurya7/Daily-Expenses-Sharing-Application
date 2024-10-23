import { Workbook } from 'exceljs';

const generateExcel = async (expenses, participants) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Balance Sheet');

  // Add headers
  worksheet.addRow(['Expense Description', 'Amount', 'Paid By', 'Split Type', 'Date']);

  // Add expense data
  expenses.forEach(expense => {
    worksheet.addRow([
      expense.description,
      expense.amount,
      expense.paidBy.name,
      expense.splitType,
      expense.date.toLocaleDateString()
    ]);
  });

  // Add participant details
  worksheet.addRow([]);
  worksheet.addRow(['Participant Details']);
  worksheet.addRow(['Participant', 'Share Amount', 'Share Type']);

  participants.forEach(participant => {
    worksheet.addRow([
      participant.userId.name,
      participant.share,
      participant.shareType
    ]);
  });

  return workbook.xlsx.writeBuffer();
};