//funções gerais com objetivo de preparar os dados que estou recebendo
// e fazer interface com o banco de dados

const axios = require('axios');

const api = axios.create({ baseURL: 'api' });
const RESOURCE = '/transactions';

//isso aqui da problema pra subir no heroku, lá nao tem localhost 
//const API_URL = `http://localhost:3001/api/transactions`


async function getAllTransactions() {
  //pegando resultado da promisse que vem da api
  const res = await api.get(`${RESOURCE}/all`);
  const transactions = JSON.parse(await res.data.transactions);
  //console.log(transactions)
  //const { description } = transactions;
  console.log(transactions)
  return {
    // ...
    transactions
    // descriptionLowerCase: description.toLowerCase()
  }
}

async function getFilteredTransactions(yearMonth) {
  //pegando resultado da promisse que vem da api
  const res = await api.get(`/${yearMonth}`);
  const transactions = JSON.parse(await res.data.transactions);
  //console.log(transactions)
  //const { description } = transactions;
  console.log(transactions)
  return {
    // ...
    transactions
    // descriptionLowerCase: description.toLowerCase()
  }
}

async function updateTransaction(transaction) {
  const response = await api.put(`/${transaction}`);
  return response.data;
}


async function deleteTransaction(transaction) {
  const response = await api.delete(`/${transaction.id}`);
  return response.data;
}

export { getAllTransactions, getFilteredTransactions, updateTransaction, deleteTransaction }
