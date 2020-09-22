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
      console.log(data)
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

      <input type='text' placeholder='Filtro..' value={filteredText} onChange={handleFilterChange} />
      <h4>Lançamentos: {filteredTransactions.length}</h4>

      {filteredTransactions.map((transaction) => {
        const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;

        return <div
          key={transaction.id}
          style={{ ...transactionStyle, backgroundColor: currentColor }}>
          <span style={{ buttonStyle }}>
            <button className="waves-effect waves-light btn-small">Editar</button>
            <button className="waves-effect waves-light btn-small" onClick={handleDeleteTransaction} id={transaction.id}>Deletar</button>


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
    padding: '10px',
    margin: '5px',
    border: '1px solid #9AECDB',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'space-around'
  },
  buttonStyle: {
    margin: '20px',
    alignItems: 'center'
  }
}
