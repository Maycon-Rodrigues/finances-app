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
  // const [filterTransaction, setFilterTransaction] = useState([]);
  const [selected, setSelected] = useState({});
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[0]);
  const [releases, setReleases] = useState(0);
  const [input, setInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const result = await (
        await api.get(`/api/transaction?period=${currentPeriod}`)
      ).data;

      setTransactions(result.transactions);
      // setFilterTransaction(result.transactions);
      setReleases(result.length);
    };

    getData();
  }, [currentPeriod]);

  const handleInputChange = (newValue) => {
    setInput(newValue);
    // setFilterTransaction(filter);
  };

  const filter = transactions.filter((d) =>
    d.description.toLowerCase().includes(input)
  );

  const handleSave = async (formData) => {
    const { _id, category, description, value, yearMonthDay } = formData;
    // const newTransaction = [...transactions];
    // const newTransaction = Object.assign([], transactions);
    // let transaction = newTransaction.find((t) => t._id === _id);
    // transaction = formData

    const transaction = transactions.find((t) => t._id === _id);
    transaction.category = category;
    transaction.description = description;
    transaction.value = value;
    transaction.yearMonthDay = yearMonthDay;

    await api.patch(`/api/transaction/update/${formData._id}`, formData);

    setTransactions(transactions);
    // setTransactions([...newTransaction, transaction]);
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
    setIsModalOpen(true);
    setSelected(transaction);
  };

  const handlePeriodChage = (newDate) => {
    setCurrentPeriod(newDate);
  };

  return (
    <div>
      <TransactionContext.Provider value={filter}>
        <Date
          periods={PERIODS}
          currentPeriod={currentPeriod}
          onPeriodChange={handlePeriodChage}
        />

        <InputFilter currentValue={input} onInputChange={handleInputChange} />

        <Info length={releases} />

        {!filter.length && <Spinner />}
        <Card
          onDelete={handleDelete}
          onEdit={handleEdit}
          // context={transactions}
        />

        {isModalOpen && (
          <TransactionModal
            onClose={handleClose}
            selected={selected}
            onSave={handleSave}
          />
        )}
      </TransactionContext.Provider>
    </div>
  );
}
