import React from 'react';
import * as api from './apiService'

export default function App() {
  const testAPI = async () => {
    const result = await api.getAllTransacitons(`2019-10`);
    console.log(result);
  }
  testAPI();
  return <h1>Desafio Final do Bootcamp Full Stack</h1>;
}
