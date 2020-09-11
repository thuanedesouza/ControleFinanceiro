const express = require('express');

const transactionRouter = express.Router();

transactionRouter.get('/', async (_, res) => {
  try {
    console.log('ok');
    res.status(500).send({ error: 'É necessário informar o parâmetro \"period"\, cujo o valor deve estar no formato yyyy-mm' });
  } catch (err) {
    console.log(err.message)
  }
}
)

module.exports = transactionRouter;