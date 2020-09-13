const express = require('express');
const TransactionModel = require('../models/TransactionModel.js');
const transactionRouter = express.Router();
// dessa forma não importa o que transactionService usa no db,
//aqui estão só as rotas
const service = require('../services/transactionService')

transactionRouter.get('/', async (req, res) => {
  const { query } = req;
  try {
    if (!query.period) {
      res.status(500).send({ error: 'É necessário informar o parâmetro \"period"\, cujo o valor deve estar no formato yyyy-mm' });
    }

    const { period } = query;
    //aqui seria bom um data helpers para validar
    const filteredTransactions = await service.getTransactionsFrom(period);
    res.send({
      length: filteredTransactions,
      transactions: filteredTransactions
    })

  } catch (err) {
    res.status(400).send(err.message);
  }
});


transactionRouter.get('/all', async (req, res) => {
  try {
    const transactions = await TransactionModel.find({})
    res.send(transactions);

  } catch (err) {
    res.status(500).send(err);
  }
})

transactionRouter.get('/:period', async (req, res) => {
  try {
    const transactions = await TransactionModel.find({ yearMonth: req.params.period })
    res.send(transactions);

  } catch (err) {
    res.status(500).send(err);
  }
})

transactionRouter.post('/', async (req, res) => {
  const { body } = req;

  try {
    const { description, value, category, year, month, day, type } = body

    const newTransaction = await service.postTransaction({
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth: `${year}${month}`,
      yearMonthDay: `${year}${month}${day}`,
      type
    })

    res.send({ status: ok, transaction: newTransaction });
  }
  catch (err) {
    res.status(500).send(err.message);
  }
})

transactionRouter.put('/:id', async (req, res) => {
  const { body, params } = req;
  try {
    validateParams(params);
    const { description, value, category, year, month, day, type } = body;
    const { id } = params;

    const newTransaction = await service.updateTransaction(id, {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth: `${year}${month}`,
      yearMonthDay: `${year}${month}${day}`,
      type
    })

  }
  catch (err) {
    res.status(500).send(err.message);
  }
})


transactionRouter.delete('/:id', async (req, res) => {
  const { params } = request;
  try {
    validateParams(params);
    const { id } = params;
    await service.deleteTransaction(id);
    res.send({
      status: 'ok',
      message: `Lançamento com id:${id} excluido com sucesso `
    });
  }
  catch (err) {
    res.status(500).send(err.message);
  }
})
async function validateParams(params) {
  if (!params.id) {
    throw new Error('É necessário informar o id do lançamento');
  }
}
module.exports = transactionRouter;