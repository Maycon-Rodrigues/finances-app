import React, { useState } from 'react';

import './style.css';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    position: 'fixed',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
  },
};

export default function TransactionModal({ onClose, selected, onSave }) {
  const [transaction, setTransaction] = useState(selected);

  const { category, description, type, value, yearMonthDay } = transaction;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onSave(transaction);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setTransaction({ ...transaction, [name]: value });
  };

  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true} style={customStyles}>
        <div>
          <h5>Lancamento</h5>
          <hr />

          <form onSubmit={handleFormSubmit}>
            <div className="formRow">
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="type"
                    type="radio"
                    value="+"
                    checked={type === '+' ? true : false}
                    onChange={handleFormChange}
                    disabled={type ? true : false}
                  />
                  <span>Receita</span>
                </label>
              </p>

              <p>
                <label>
                  <input
                    className="with-gap"
                    name="type"
                    type="radio"
                    value="-"
                    checked={type === '-' ? true : false}
                    onChange={handleFormChange}
                    disabled={type ? true : false}
                  />
                  <span>Despesa</span>
                </label>
              </p>
            </div>

            <div className="input-field">
              <input
                id="inputCategory"
                name="category"
                type="text"
                value={category || ''}
                onChange={handleFormChange}
              />
              <label className="active" htmlFor="inputCategory">
                Categoria
              </label>
            </div>

            <div className="input-field">
              <input
                id="inputDescription"
                name="description"
                type="text"
                value={description || ''}
                onChange={handleFormChange}
              />
              <label className="active" htmlFor="inputDescription">
                Descrição
              </label>
            </div>

            <div className="input-field">
              <input
                id="inputValue"
                name="value"
                type="number"
                min="0"
                step="0.01"
                value={value || ''}
                onChange={handleFormChange}
              />
              <label className="active" htmlFor="inputValue">
                Valor
              </label>
            </div>

            <div className="input-field">
              <input
                id="inputDate"
                name="yearMonthDay"
                type="Date"
                value={yearMonthDay || ''}
                onChange={handleFormChange}
              />
              <label className="active" htmlFor="inputDate">
                Data
              </label>
            </div>

            <div className="formRowButton">
              <button className="waves-effect waves-lights btn green accent-4">
                Salvar
              </button>

              <button
                className="waves-effect waves-lights btn red dark-4"
                onClick={handleModalClose}
              >
                Sair
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
