import React, { useContext } from 'react';
import { TransactionContext } from '../Transaction/TransactionList';

export default function Button() {
  const context = useContext(TransactionContext);

  return (
    <button
      onClick={context}
      type="submit"
      className="waves-effect waves-light green accent-4 btn"
    >
      Novo Lançamento
    </button>
  );
}
