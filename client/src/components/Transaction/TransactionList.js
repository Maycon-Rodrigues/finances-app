import React, { useEffect, useState, createContext } from 'react';

import api from '../../services/api';

import Card from './Card/Card';
import Info from './Info/Info';
import Spinner from '../Spinner/Spinner';
import InputFilter from '../InputFilter/InputFilter';

export const TransactionContext = createContext([]);

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [releases, setReleases] = useState(0);
  const [input, setInput] = useState('');

  const period = '2019-03';

  useEffect(() => {
    const getData = async () => {
      const result = await (await api.get(`/api/transaction?period=${period}`))
        .data;

      setTransactions(result.transactions);
      setReleases(result.length);
    };

    getData();
  }, []);

  const handleInputChange = (newValue) => {
    setInput(newValue);
  };

  const filter = transactions.filter((d) =>
    d.description.toLowerCase().includes(input)
  );

  return (
    <div>
      <TransactionContext.Provider value={filter}>
        <InputFilter currentValue={input} onInputChange={handleInputChange} />

        <Info length={releases} />

        {!transactions.length && <Spinner />}
        <Card />
      </TransactionContext.Provider>
    </div>
  );
}
