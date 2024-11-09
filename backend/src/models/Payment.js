class Payment {
  constructor(areaId, startTime, endTime, dayType, currency, amount) {
    this.areaId = areaId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.dayType = dayType;
    this.currency = currency;
    this.amount = amount;
  }
}

module.exports = Payment;
