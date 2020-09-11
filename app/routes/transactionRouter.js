const express = require('express');
const TransactionModel = require('../models/TransactionModel.js');
const transactionRouter = express.Router();

transactionRouter.get('/', async (_, res) => {
  try {
    res.status(500).send({ error: 'É necessário informar o parâmetro \"period"\, cujo o valor deve estar no formato yyyy-mm' });
  } catch (err) {
    res.status(001).send(err);
  }
});

transactionRouter.get('/:period', async (req, res) => {
  try {
    const transactions = await TransactionModel.find({ yearMonth: req.params.period })
    res.send(transactions);

  } catch (err) {
    res.status(500).send(err);
  }
})

transactionRouter.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await TransactionModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.send(transaction);
  }
  catch (err) {
    res.status(500).send(err);
  }
})

transactionRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await TransactionModel.findByIdAndDelete({ _id: id });
    if (!transaction) {
      res.status(404).send('Documento nao encontrado na selecao');
    }
    else {
      res.status(200).send();
    }
  }
  catch (err) {
    res.status(500).send(err);
  }
})

module.exports = transactionRouter;