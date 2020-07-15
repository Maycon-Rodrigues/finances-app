import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import Card from './Card/Card';
import Info from './Info/Info';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [releases, setReleases] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const result = await (await api.get('/api/transaction?period=2020-07'))
        .data;

      setTransactions(result.transactions);
      setReleases(result.length);
    };

    getData();
  }, []);

  return (
    <div>
      <Info length={releases} data={transactions} />
      <Card data={transactions} />
    </div>
  );
}
