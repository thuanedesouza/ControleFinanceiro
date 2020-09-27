const express = require('express');
const transactionRouter = express.Router();
// dessa forma não importa o que transactionService usa no db,
//aqui estão só as rotas
const service = require('../services/transactionService')
const dateHelper = require('../helpers/dateHelper')

transactionRouter.get('/:period', async (req, res) => {
  const { params } = req;
  try {
    if (!params) {
      res.status(500).send({ error: 'É necessário informar o parâmetro \"period"\, cujo o valor deve estar no formato yyyy-mm' });
    }

    const { period } = params;
    dateHelper.periodValidation(period);

    const filteredTransactions = await service.getTransactionsFrom(period);
    res.send({
      length: filteredTransactions.length,
      transactions: filteredTransactions
    })

  } catch (err) {
    res.status(400).send(err.message);
  }
});

// transactionRouter.post('/', async (request, response) => {
//   const { body } = request;

//   try {
//     await validateTransactionData(body);

//     const { description, value, category, year, month, day, type } = body;

//     const period = dateHelpers.createPeriodFrom(year, month);

//     const newTransaction = await service.postTransaction({
//       description,
//       value,
//       category,
//       year,
//       month,
//       day,
//       yearMonth: period,
//       yearMonthDay: dateHelpers.createDateFrom(year, month, day),
//       type,
//     });

//     response.send({ status: 'ok', transaction: newTransaction });
//   } catch ({ message }) {
//     console.log(message);
//     response.status(400).send({ error: message });
//   }
// });
transactionRouter.post('/', async (req, res) => {
  console.log('cheguei')
  const { body } = req;
  console.log(body);

  try {
    await validateTransactionData(body);
    const { description, value, category, year, month, day, type } = body;
  
    const period = dateHelper.createPeriodFrom(year, month);
    console.log(period)
    const newTransaction = await service.postTransaction({
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth: period,
      yearMonthDay: dateHelper.createDateFrom(year, month, day),
      type
    })

    res.send({ status: 'ok', transaction: newTransaction, new: true });
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send(err.message);
  }
})

transactionRouter.put('/:id', async (req, res) => {
  const { body, params } = req;
  try {
    validateTransactionId(params);
    validateTransactionData(body);

    const { description, value, category, year, month, day, type } = body;
    const { id } = params;
  
    const period = dateHelper.createPeriodFrom(year, month)
    const newTransaction = await service.updateTransaction(id, {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth: period,
      yearMonthDay: dateHelper.createDateFrom(year, month, day),
      type
    })
    res.send({ status: 'ok', transaction: newTransaction, new: true })
  }
  catch (err) {
    res.status(500).send(err.message);
  }
})


transactionRouter.delete('/:id', async (req, res) => {
  const { params } = req;
  try {
    validateTransactionId(params);
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


async function validateTransactionId(params) {
  if (!params.id) {
    throw new Error('É necessário informar o id do lançamento');
  }
}

async function validateTransactionData(body) {
  const { description, value, category, year, month, day } = body;

  if (!description || description.trim() === '') {
    throw new Error('A descrição é obrigatória');
  }

  if (!value) {
    throw new Error('O valor é obrigatório');
  }

  if (!category || category.trim() === '') {
    throw new Error('A categoria é obrigatória');
  }

  if (!year || year.toString() === '') {
    throw new Error('O ano é obrigatório');
  }

  if (!month || month.toString() === '') {
    throw new Error('O mês é obrigatório');
  }

  if (!day || day.toString() === '') {
    throw new Error('O dia é obrigatório');
  }
  if (!type || type.toString() === "") {
    throw new Error('O tipo de lançamento é obrigatório');
  }

  if (type.trim() !== "+" && type.trim() !== "-") {
    throw new Error(
      `Tipo de de lançamento (${type}) - A propriedade type, despesa ou receita, deve ter o valor '+' ou '-' `
    );
  }

}


module.exports = transactionRouter;