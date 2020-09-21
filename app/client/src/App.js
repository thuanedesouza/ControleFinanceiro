import React, { useEffect, useState } from 'react';
import * as api from './api/apiService.js'
import Spinner from './components/Spinner';


const EARNING_COLOR = '#9AECDB';
const EXPENSE_COLOR = '#FEA47F';

export default function App() {
  const [periods, setperiods] = useState([]);

  const [currentPeriod, setCurrentPeriod] = useState("2019-01");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);


  useEffect(() => {
    const getAllPeriods = async () => {
      const allperiods = await api.getAllPeriods();
      const arrayPeriods = allperiods.map(({ id, description, index }) => {
        return [id, description, index]
      })

      console.log(arrayPeriods)
      setperiods(arrayPeriods);

    };
    getAllPeriods()
  }, [])


  useEffect(() => {
    const getTransactions = async () => {
      console.log(`${currentPeriod}`)
      const data = await api.getTransactionsFrom(`${currentPeriod}`)
      console.log(data)
      setTimeout(() => {
        setTransactions(data);
        //começa sem filtro
        setFilteredTransactions(data);
      }, 2000);
    };
    getTransactions();
  }, [currentPeriod]);



  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  }

  const { transactionStyle, buttonStyle } = styles

  return (
    <div className="container">
      <h1>Desafio Final do Bootcamp Full Stack</h1>

      {filteredTransactions.length === 0 && < Spinner />}

      <select className="browser-default" value={currentPeriod} onChange={handlePeriodChange}>

        {periods.map((period) => {
          return <option key={period}>{period[0]}</option>
        })}
      </select>
      <h1>{transactions.length}</h1>

      {transactions.map((transaction) => {
        const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;

        return <div
          key={transaction.id}
          style={{ ...transactionStyle, backgroundColor: currentColor }}>
          <span style={{ buttonStyle }}>
            <button className='waves-effect waves-ligth btn'>Editar</button>
            <button className='waves-effect waves-ligth btn red darken-4'>X</button>


            <span>
              {transaction.yearMonthDay} - <strong>{transaction.category}</strong> - {transaction.description} - {transaction.value}
            </span>


          </span>
        </div>
      })}


    </div>
  );
}


const styles = {
  transactionStyle: {
    padding: '5px',
    margin: '5px',
    border: '1px solid #9AECDB',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'space-around'
  },
  buttonStyle: {
    margin: '20px',
  }
}
