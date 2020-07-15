import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import Card from './Card/Card';
import Info from './Info/Info';
import Spinner from '../Spinner/Spinner';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [releases, setReleases] = useState(0);

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

  return (
    <div>
      <Info length={releases} data={transactions} />
      {!transactions.length && <Spinner />}
      <Card data={transactions} />
    </div>
  );
}
