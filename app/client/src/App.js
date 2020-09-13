import React, { useEffect, useState } from 'react';
import * as api from './apiService'
import Spinner from './components/Spinner';


export default function App() {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAllTransactions(`2019-10`);

      setTimeout(() => {
        setFilteredTransactions(transactions)
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

