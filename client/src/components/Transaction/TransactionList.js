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

  const period = '2019-02';

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

  const handleDelete = async (id) => {
    const isDelete = await api.delete(`/api/transaction/delete/${id}`);

    if (isDelete.status === 200) {
      const newTransactions = transactions.filter((t) => t._id !== id);

      setTransactions(newTransactions);
      alert(isDelete.data.message);
    }
  };

  return (
    <div>
      <TransactionContext.Provider value={filter}>
        <InputFilter currentValue={input} onInputChange={handleInputChange} />

        <Info length={releases} />

        {!filter.length && <Spinner />}
        <Card onDelete={handleDelete} />
      </TransactionContext.Provider>
    </div>
  );
}
