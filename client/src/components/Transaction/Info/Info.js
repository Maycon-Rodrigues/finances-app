import React from 'react';

import './style.css';

import { formatMoney } from '../../../helpers/formatter';

export default function Info({ length, data }) {
  const income = data
    .filter((d) => d.type === '+')
    .reduce((acc, curr) => acc + curr.value, 0);

  const expenses = data
    .filter((d) => d.type === '-')
    .reduce((acc, curr) => acc + curr.value, 0);

  const balance = income - expenses;

  return (
    <div className="infoContent">
      <div>
        Lançamentos:
        <span>{length}</span>
      </div>
      <div>
        Receitas:
        <span style={{ color: '#0fa302' }}>{formatMoney(income)}</span>
      </div>
      <div>
        Despesas:
        <span style={{ color: '#f21d1d' }}>{formatMoney(expenses)}</span>
      </div>
      <div>
        Saldo:
        <span
          style={balance >= 0 ? { color: '#0fa302' } : { color: '#f21d1d' }}
        >
          {formatMoney(balance)}
        </span>
      </div>
    </div>
  );
}
