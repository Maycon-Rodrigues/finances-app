import React, { useState } from 'react';

import './style.css';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function TransactionModal({ onClose, selected, onSave }) {
  const [transaction, setTransaction] = useState(selected);

  const { category, description, type, value } = transaction;

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
                    name="group1"
                    type="radio"
                    value={type}
                    defaultChecked={type === '+' ? true : false}
                    disabled={type ? true : false}
                  />
                  <span>Receita</span>
                </label>
              </p>

              <p>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    defaultChecked={type === '-' ? true : false}
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
                value={category}
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
                value={description}
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
                value={value}
                onChange={handleFormChange}
              />
              <label className="active" htmlFor="inputDescription">
                Valor
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
