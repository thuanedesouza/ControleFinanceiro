import React, { useEffect, useState } from 'react';
import * as api from './api/apiService.js'
import Spinner from './components/Spinner';



export default function App() {
  const [periods, setperiods] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const getAllPeriods = async () => {
      const allperiods = await api.getAllPeriods();
      setperiods(allperiods);
    };
    getAllPeriods()
  }, [])

  useEffect(() => {
    const getTransactions = async () => {
      const data = await api.getTransactionsFrom('2019-01')
      console.log(data)
      setTimeout(() => {
        setFilteredTransactions(data)
      }, 2000);
    };
    getTransactions();
  }, []);


  //   useEffect(() => {

  //     const getResults =  () =>{
  //       const despesas = [];
  //       const receitas = [];
  //       const saldo =[];

  //       JSON.parse(filteredTransactions).forEach((transaction)=>{

  //           if(transaction.type === '-'){
  //               despesas.push(transaction.value)
  //           }
  //           if(transaction.type === '+'){
  //               receitas.push(transaction.value)
  //           }
  //           saldo.push(transaction.value)
  //       })

  // };
  //   getResults()

  //   }, [])

  //   useEffect(() => {
  //     const getAllPeriods = async () =>{
  //      const allperiods = await api.getAllPeriods();
  //      setperiods(allperiods);
  //     };
  //     getAllPeriods()
  //   }, [])





  return (<div className="container">
    <h1>Desafio Final do Bootcamp Full Stack</h1>
    <h1>{filteredTransactions.length}</h1>

    {filteredTransactions.length === 0 && < Spinner />}

  </div>
  );
}

