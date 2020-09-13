import React, { useEffect, useState } from 'react';
import * as api from './api/apiService'
import Spinner from './components/Spinner';


export default function App() {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const a = '123'
      const b = '456'
      console.log(`${a}testehtt${b}`)
      const data = await api.getTransactionsFrom('2019-01')
      setTimeout(() => {
        setFilteredTransactions(data)
      }, 2000);
    };
    getTransactions();
  }, []);


  return (<div>
    <h1>Desafio Final do Bootcamp Full Stack</h1>
    {filteredTransactions.length === 0 && < Spinner />}
  </div>

  );
}

