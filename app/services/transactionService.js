//Essa camada é um design pattern que ajuda a abstrair suas regras de negócio ( banco de dados :D ), 
//deixando sua controller mais limpa e com a responsabilidade única.


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');


function extractTransactionModelfrom(mongoDBTransaction) {
  //extraindo do modelo
  const {
    _id,
    description,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type
  } = mongoDBTransaction;
  // retornando somente esses tipos, é assim que eu retorno só o que é útil para o front.
  const newTransaction = {
    _id,
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type
  }

  return newTransaction;
}

async function getTransactionsFrom(period) {
  //consulta
  const transactions = await TransactionModel.find({ yearMonth: period });
  return transactions;
}

async function postTransaction(transaction) {
  //criando transaction
  const newTrasactionMongo = await TransactionModel.create(transaction);
  //deixando apenas os dados que me interessam
  const newTransaction = extractTransactionModelfrom(newTrasactionMongo);
  return newTransaction;
}

async function updateTransaction(_id, transaction) {
  await TransactionModel.updateOne({ _id: ObjectId(_id) }, transaction);
  return { _id, ...transaction }
}

async function deleteTransaction(_id) {
  await TransactionModel.deleteOne({ _id: ObjectId(_id) });
  return true;
}

module.exports = {
  getTransactionsFrom,
  postTransaction,
  updateTransaction,
  deleteTransaction
}