function isValidDate(dateString) {
    // Check if date string is valid
    if (!/^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/.test(dateString)) {
      return false;
    }
  
    // Check if date is a valid date
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return false;
    }
  
    return true;
  }

  module.exports={isValidDate}
  