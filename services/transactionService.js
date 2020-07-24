const TransactionModel = require('../models/TransactionModel');

module.exports = {
  async getAll(req, res) {
    const period = req.query.period;

    if (!period) {
      return res.status(400).send({
        error: `É necessário informar o parâmetro "period", cujo valor deve estar no formado yyyy-mm`,
      });
    }
    const yearMonth = { yearMonth: period };

    try {
      const data = await TransactionModel.find(yearMonth).sort('day').exec();
      const qtd = data.length;

      res.send({ length: qtd, transactions: data });
    } catch (error) {
      res.status(404).send({ message: 'Não encontrado' });
    }
  },

  async create(req, res) {
    const yearMonthDay = req.body.yearMonthDay;
    const split = yearMonthDay.split('-');
    const yearMonth = `${split[0]}-${split[1]}`;

    const create = {
      description: req.body.description,
      value: req.body.value,
      category: req.body.category,
      year: parseInt(split[0]),
      month: parseInt(split[1]),
      day: parseInt(split[2]),
      yearMonth: yearMonth,
      yearMonthDay: yearMonthDay,
      type: req.body.type,
    };
    try {
      const data = new TransactionModel(create);
      data.save();

      res.send({ message: 'Lançamento criado com sucesso', data });
    } catch (error) {
      res.status(500).send({ message: 'Não foi possivel criar o lançamento' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const yearMonthDay = req.body.yearMonthDay;
    const split = yearMonthDay.split('-');
    const yearMonth = `${split[0]}-${split[1]}`;

    const update = {
      description: req.body.description,
      value: req.body.value,
      category: req.body.category,
      year: parseInt(split[0]),
      month: parseInt(split[1]),
      day: parseInt(split[2]),
      yearMonth: yearMonth,
      yearMonthDay: yearMonthDay,
    };

    try {
      await TransactionModel.findByIdAndUpdate(id, update);
      res.send({ message: 'Atualizado com sucesso' });
    } catch (error) {
      res.status(404).send({ message: `id: ${id} Não encontrado` });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await TransactionModel.findByIdAndRemove(id);
      res.send({ message: 'Removido com sucesso' });
    } catch (error) {
      res.status(404).send({ message: `id: ${id} Não encontrado` });
    }
  },
};
