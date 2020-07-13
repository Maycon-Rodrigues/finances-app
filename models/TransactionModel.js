const mongoose = require('mongoose');

const schema = mongoose.Schema({
  description: String,
  value: Number,
  category: String,
  year: Number,
  month: Number,
  day: Number,
  yearMonth: String,
  yearMonthDay: String,
  type: String,
});

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
