const ExcelJS = require('exceljs');

const generateExcel = async (expenses, participants) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Balance Sheet');

  worksheet.addRow(['Expense Description', 'Amount', 'Paid By', 'Split Type', 'Date']);

  expenses.forEach(expense => {
    worksheet.addRow([
      expense.description,
      expense.amount,
      expense.paidBy.name,
      expense.splitType,
      expense.date.toLocaleDateString()
    ]);
  });


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
