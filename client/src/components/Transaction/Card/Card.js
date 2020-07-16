import React, { useContext } from 'react';

import './style.css';

import { TransactionContext } from '../TransactionList';
import { formatMoney, formatNumber } from '../../../helpers/formatter';

export default function Card({ onDelete }) {
  const context = useContext(TransactionContext);

  const handleOnDelete = (id) => {
    onDelete(id);
  };

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
            <button onClick={() => console.log(element)}>
              <i className="small material-icons">edit</i>
            </button>
            <button onClick={() => handleOnDelete(element._id)}>
              <i className="small material-icons">delete</i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
