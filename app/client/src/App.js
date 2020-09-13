import React, { useEffect, useState } from 'react';
import * as api from './apiService'
import Spinner from './components/Spinner';


export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await api.getAllTransacitons(`2019-10`);

      setTimeout(() => {
        setAllTransactions(transactions)
      }, 2000);
    };
    getTransactions();
  }, []);


  return (<div>
    <h1>Desafio Final do Bootcamp Full Stack</h1>
    {allTransactions.length === 0 && < Spinner />}
  </div>

  );
}

