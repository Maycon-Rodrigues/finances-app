import React, { useContext } from 'react';

import { TransactionContext } from '../TransactionList';

import './style.css';

import { formatMoney, formatNumber } from '../../../helpers/formatter';

export default function Card() {
  const context = useContext(TransactionContext);

  return (
    <div className="cardScroll">
      {context.map((element) => (
        <div
          key={element._id}
          className="content"
          style={
            element.type === '-'
              ? { backgroundColor: '#ff9797' }
              : { backgroundColor: '#76ec8f' }
          }
        >
          <div className="flexRow">
            <span className="day">{formatNumber(element.day)}</span>
            <div className="flexCol">
              <span className="category">{element.category}</span>
              <span>{element.description}</span>
            </div>
          </div>
          <div className="flexRow">
            <span className="value">{formatMoney(element.value)}</span>
            <span className="tiny material-icons">edit</span>
            <span className="tiny material-icons">remove</span>
          </div>
        </div>
      ))}
    </div>
  );
}
