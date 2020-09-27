import React, { useEffect, useState } from 'react';
import * as api from './api/apiService.js'
import Spinner from './components/Spinner';
import ListScreen from './components/ListScreen.js';
import MaintenanceScreen from './components/MaintenanceScreen.js';


const LIST_SCREEN = 1;
const MAINTNANCE_SCREEN = 0;
export default function App() {
  //
  const [currentScreen, setCurrentScreen] = useState(LIST_SCREEN);
  const [periods, setperiods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState("2019-01");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filteredText, setFilteredText] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState(false);


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
      const data = await api.getTransactionsFrom(`${currentPeriod}`)
      if(data){
       
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
      });
    }

    setFilteredTransactions(newFilteredTransactions);

  }, [transactions, filteredText])

  useEffect(()=>{ 
    selectedTransaction !== null || newTransaction? 
    setCurrentScreen(MAINTNANCE_SCREEN) : setCurrentScreen(LIST_SCREEN);

  }, [selectedTransaction, newTransaction])

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  }

  const handleDeleteTransaction = (event) => {
    const id = event.target.id
    api.deleteTransaction(id);
    //um tipo de render()
    const newTransactions = transactions.filter((transaction) => {
      return transaction.id !== id
    })
    setTransactions(newTransactions);
  }

  const handleEditTransaction = (event) => {
    const id = event.target.id;
   
    const newSelectedTransaction = filteredTransactions.find((transaction)=>{
      return transaction.id === id;
    }); 

    setSelectedTransaction(newSelectedTransaction);
  }

  const handleFilterChange = (event) => {
    const text = event.target.value.trim();
    setFilteredText(text.toLowerCase());
  }

  const handlenCancelMaintenance = ()=>{
    setNewTransaction(false);
    setSelectedTransaction(null);
  }

  const handleSaveMaintenance = async (editedTransaction) =>{
    console.log(editedTransaction);
    setSelectedTransaction(editedTransaction);

    if (!editedTransaction.id){
      const transactionToInsert = editedTransaction;
      const transactionFromAPI = await api.postTransaction(transactionToInsert);
      console.log(transactionFromAPI)
      // console.log(data.transaction);
      // const newTransactions = [...transactions, data.transaction];
      // newTransactions.sort((a,b) =>{
      //   return a.yearMonthDay.localeCompare(b.yearMonthDay);
      // })
      // setTransactions(newTransactions);
      // //aqui ficou dificil de fugir
      // setNewTransaction(null);
    }
    else{

      await api.updateTransaction(editedTransaction);
  
      const newTransactions = [...transactions];
      const index = newTransactions.findIndex((transaction)=>{
        return editedTransaction.id === transaction.id
      })
  
      newTransactions[index] = editedTransaction;
      setTransactions(newTransactions);
      //aqui ficou dificil de fugir
      setNewTransaction(null);
      setSelectedTransaction(null);
    }
  }
    const handleNewTransaction = () => {
      setNewTransaction(true);
    }
  
  
    return (
      <div className="container">
        <h3>Desafio Final do Bootcamp Full Stack</h3>
  
        {filteredTransactions.length === 0 && < Spinner />}
  
        {currentScreen ?  
         <ListScreen 
        periods = {periods}
        currentPeriod = {currentPeriod}
        transactions = {filteredTransactions}
        filteredText = {filteredText}
        onDelete ={handleDeleteTransaction}
        onEdit = {handleEditTransaction}
        onNewTransaction = {handleNewTransaction}
        onFilterChange = {handleFilterChange}
        onPeriodChange = {handlePeriodChange}
       /> : <MaintenanceScreen 
       transaction ={selectedTransaction} 
       onCancel = {handlenCancelMaintenance} 
       onSave = {handleSaveMaintenance}/>}
       
  
      </div>
    );
}


