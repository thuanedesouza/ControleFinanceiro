//funções gerais com objetivo de preparar os dados para ir pra view
// e fazer interface com o banco de dados

const axios = require('axios');
//isso aqui da problema pra subir no heroku:
const api = axios.create({ baseURL: 'http://localhost:3001/api' });
// lá nao tem localhost 
//tentar:
//const api = axios.create({ baseURL: 'api' });
const RESOURCE = '/transactions';
const CURRENT_YEAR = new Date().getFullYear();
const GLOBAL_YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];
const GLOBAL_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MONTH_DESCRIPTIONS = [
  '',
  'Jan',
  'Fev',
  'Mar',
  'Abri',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez'
]

let allPeriods = []

function _processPeriods() {

  allPeriods = [];

  let index = 0;
  GLOBAL_YEARS.forEach((year) => {
    GLOBAL_MONTHS.forEach((month) => {
      const id = `${year} - ${month.toString().padEnd(2, '0')}`;
      const monthDescription = `${MONTH_DESCRIPTIONS[month]}/${year}`;
      allPeriods.push({ id, description: monthDescription, index: index++ })
    })
  })
}

// padEnd() completa a string atual com uma dada string (repetindo-a, caso necessário) 
// de maneira que a string resultante alcance um comprimento dado. 
//No caso ele preencheria com zero até dar 2.
// O preenchimento é aplicado a partir do fim (direita) da string atual.

function _prepareTransactions(transaction) {
  const { description, category, _id: id, month, ...others } = transaction;
  return {
    id,
    description,
    category,
    month,
    descriptionLowerCase: description.toLowerCase(),
    categoryLowerCase: category.toLowerCase(),
    monthDescription: MONTH_DESCRIPTIONS[month],
    ...others
  }

}

async function getTransactionsFrom(period) {

  //const { id: yearMonth } = period;

  const { data } = await api.get(`${RESOURCE}/${period}`);
  const frontEndTransactions = data.transactions.map((transaction) => {
    return _prepareTransactions(transaction);
  });

  return frontEndTransactions.sort((a, b) => {
    return a.yearMonthDay.localeCompare(b.yearMonthDay)
  });
}

async function getAllPeriods() {
  if (allPeriods.length === 0) {
    _processPeriods();
  }
  return allPeriods;
}

async function deleteTransaction(id) {
  await api.delete(`${RESOURCE}/${id}`);
  return;
}

async function getCompleteTransaction(transaction) {
  const { yearMonthDay } = transaction;
  // o + transforma a string em number
  const year = +yearMonthDay.substring(0, 4);
  const month = +yearMonthDay.substring(5, 7);
  const day = +yearMonthDay.substring(8, 10);

  const completeTransaction = {
    ...transaction,
    year,
    month,
    day
  };
  return completeTransaction;
}

async function updateTransaction(transaction) {
  const { id } = transaction;
  const completeTransaction = getCompleteTransaction(transaction);
  await api.put(`${RESOURCE}/${id}`, completeTransaction);

  const updatedTransaction = _prepareTransactions(completeTransaction);
  return updatedTransaction;
}


async function postTransaction(transaction) {
  const completeTransaction = getCompleteTransaction(transaction);
  const { data } = await api.post(RESOURCE, completeTransaction);
  const newTransaction = _prepareTransactions(data.transaction);
  return newTransaction;
}

export {
  getTransactionsFrom,
  getAllPeriods,
  deleteTransaction,
  postTransaction,
  updateTransaction
}
