export const validateName = (name: string) => {
  if (!name.trim() || typeof name !== "string") {
    return "Name is required and must be a valid string.";
  } else if (name.length < 3) {
    return "Name must be at least 3 characters long";
  }

  return "";
};

export const validateWeekDay = (weekdayRate: string) => {
  const weekdayRateNum = Number(weekdayRate);
  if (!weekdayRate.trim() || isNaN(weekdayRateNum) || weekdayRateNum <= 0) {
    return "Please enter a valid weekday rate (must be a number greater than 0).";
  }

  return "";
};

export const validateWeekend = (weekendRate: string) => {
  const weekendRateNum = Number(weekendRate);
  if (!weekendRate.trim() || isNaN(weekendRateNum) || weekendRateNum <= 0) {
    return "Please enter a valid weekend rate (must be a number greater than 0).";
  }

  return "";
};

export const validateDiscount = (discount: string) => {
  if (
    discount &&
    (isNaN(Number(discount)) || Number(discount) < 0 || Number(discount) > 100)
  ) {
    return "Discount must be a number greater than or equal to 0, or less than 100 if provided.";
  }

  return "";
};
