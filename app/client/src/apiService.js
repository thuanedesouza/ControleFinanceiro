const axios = require('axios');

const API_URL = 'http://localhost:3001/api/transactions/'

async function getAllTransacitons(yearMonth) {
  //pegando resultado da promisse que vem da api
  const res = await axios.get(`${API_URL}/${yearMonth}`);
  const transactions = JSON.parse(await res.transactions);
  //console.log(transactions)
  //const { description } = transactions;

  return {
    // ...
    transactions
    // descriptionLowerCase: description.toLowerCase()
  }
}

async function updateTransaction(transaction) {
  const response = await axios.put(API_URL, transaction);
  return response.data;
}


async function deleteTransaction(transaction) {
  const response = await axios.delete(`${API_URL}/${transaction.id}`);
  return response.data;
}

export { getAllTransacitons, updateTransaction, deleteTransaction }
