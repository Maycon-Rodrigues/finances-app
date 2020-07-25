import React, { useEffect, useState, createContext } from 'react';

import api from '../../services/api';

import Card from './Card/Card';
import Info from './Info/Info';
import Spinner from '../Spinner/Spinner';
import InputFilter from '../InputFilter/InputFilter';
import Date from '../Date/Date';
import TransactionModal from '../Modal/Modal';

import PERIODS from '../../helpers/periods';

export const TransactionContext = createContext([]);

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState({});
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[0]);
  const [input, setInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await (
        await api.get(`/api/transaction?period=${currentPeriod}`)
      ).data;

      setTransactions(result.transactions);
    };

    getData();
  }, [currentPeriod]);

  useEffect(() => {
    const filterTransaction = (input) => {
      const filtered = transactions.filter((d) =>
        d.description.toLowerCase().includes(input)
      );

      setFiltered(filtered);
    };

    filterTransaction(input);
  }, [input, transactions]);

  const handleInputChange = (newValue) => {
    setInput(newValue);
  };

  const handleSave = async (formData) => {
    const { _id, type, category, description, value, yearMonthDay } = formData;

    const transaction = transactions.find((t) => t._id === _id);
    if (transaction) {
      transaction.category = category;
      transaction.description = description;
      transaction.value = parseFloat(value);
      transaction.yearMonthDay = yearMonthDay;

      await api.patch(`/api/transaction/update/${formData._id}`, formData);

      setTransactions(transactions.sort((a, b) => a.day - b.day));
    } else {
      const postData = { type, category, description, value, yearMonthDay };

      const res = await api.post('/api/transaction/create', postData);
      const { data } = res.data;

      setTransactions([...transactions, data].sort((a, b) => a.day - b.day));
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    const isDelete = await api.delete(`/api/transaction/delete/${id}`);

    if (isDelete.status === 200) {
      const newTransactions = transactions.filter((t) => t._id !== id);

      setTransactions(newTransactions);
      // alert(isDelete.data.message);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (transaction) => {
    setIsEditing(true);
    setIsModalOpen(true);
    setSelected(transaction);
  };

  const handleNew = () => {
    setSelected({});
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handlePeriodChage = (newDate) => {
    setCurrentPeriod(newDate);
  };

  return (
    <div>
      <TransactionContext.Provider value={filtered}>
        <Date
          periods={PERIODS}
          currentPeriod={currentPeriod}
          onPeriodChange={handlePeriodChage}
        />

        <TransactionContext.Provider value={handleNew}>
          <InputFilter currentValue={input} onInputChange={handleInputChange} />
        </TransactionContext.Provider>

        <Info length={transactions.length} />

        {!transactions.length && <Spinner />}
        <Card
          onDelete={handleDelete}
          onEdit={handleEdit}
          // context={transactions}
        />

        {isModalOpen && (
          <TransactionModal
            onClose={handleClose}
            selected={selected}
            isEditing={isEditing}
            onSave={handleSave}
          />
        )}
      </TransactionContext.Provider>
    </div>
  );
}
