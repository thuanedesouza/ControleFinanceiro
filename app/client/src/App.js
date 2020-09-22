import React, { useEffect, useState } from 'react';
import * as api from './api/apiService.js'
import Spinner from './components/Spinner';
import ListScreen from './components/ListScreen.js';



export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [periods, setperiods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState("2019-01");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filteredText, setFilteredText] = useState('');


  useEffect(() => {
    const getAllPeriods = async () => {
      const allperiods = await api.getAllPeriods();
      const arrayPeriods = allperiods.map(({ id, description, index }) => {
        return [id, description, index]
      })
      setperiods(arrayPeriods);

    };
    getAllPeriods()
  }, [])


  useEffect(() => {
    const getTransactions = async () => {
      console.log(`${currentPeriod}`)
      const data = await api.getTransactionsFrom(`${currentPeriod}`)
      if(data){
        setCurrentScreen(1);
      }
      setTimeout(() => {
        setTransactions(data);
        //começa sem filtro
        //dois sets seguidos é bad smell, transformei em use Effect só de filtered
        //        setFilteredTransactions(data);
      }, 2000);
    };
    getTransactions();
  }, [currentPeriod]);

  useEffect(() => {
    let newFilteredTransactions = [...transactions];
    if (filteredText.trim() !== '') {
      newFilteredTransactions = newFilteredTransactions.filter(transaction => {
        return transaction.description.toLowerCase().includes(filteredText);
      })
     
    }
    console.log(newFilteredTransactions)

    setFilteredTransactions(newFilteredTransactions);

  }, [transactions, filteredText])

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  }

  const handleDeleteTransaction = (event) => {
    const id = event.target.id
    console.log(event)
    api.deleteTransaction(id);
    //um tipo de render()
    const newTransactions = transactions.filter((transaction) => {
      return transaction.id !== id
    })
    setTransactions(newTransactions);
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value.trim())
    const text = event.target.value.trim();
    setFilteredText(text.toLowerCase());
  }



  return (
    <div className="container">
      <h1>Desafio Final do Bootcamp Full Stack</h1>

      {filteredTransactions.length === 0 && < Spinner />}
      {currentScreen ?  
      <ListScreen 
      periods = {periods}
      currentPeriod = {currentPeriod}
      transactions = {filteredTransactions}
      filteredText = {filteredText}
      onDelete ={handleDeleteTransaction}
      onFilterChange = {handleFilterChange}
      onPeriodChange = {handlePeriodChange}
     /> : <p>Tela em manutenção</p>}
     

    </div>
  );
}


