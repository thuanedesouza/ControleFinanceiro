const express = require('express');
const TransactionModel = require('../models/TransactionModel.js');
const transactionRouter = express.Router();

transactionRouter.get('/', async (_, res) => {
  try {
    console.log('ok');
    res.status(500).send({ error: 'É necessário informar o parâmetro \"period"\, cujo o valor deve estar no formato yyyy-mm' });
  } catch (err) {
    console.log(err.message)
  }
});

transactionRouter.get('/:period', async (req, res) => {
  try {
    const transactions = await TransactionModel.find({ yearMonth: req.params.period })
    res.send(transactions);

  } catch{

  }
})

module.exports = transactionRouter;