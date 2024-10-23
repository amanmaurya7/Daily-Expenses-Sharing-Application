const validateExpenseInput = (amount, splitType, participants) => {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
  
    if (!['EQUAL', 'EXACT', 'PERCENTAGE'].includes(splitType)) {
      throw new Error('Invalid split type');
    }
  
    if (!Array.isArray(participants) || participants.length === 0) {
      throw new Error('At least one participant is required');
    }
  
    return true;
  };
  
  export default {
    generateExcel,
    validateExpenseInput
  };