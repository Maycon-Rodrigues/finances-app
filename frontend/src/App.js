import React from 'react';

import TransactionList from './components/Transaction/TransactionList';
import Header from './components/Header/Header';

export default function App() {
  return (
    <div className="container">
      <Header />
      <TransactionList />
    </div>
  );
}
