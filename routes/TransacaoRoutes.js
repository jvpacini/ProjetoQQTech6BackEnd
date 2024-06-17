const express = require('express');
const { getTransacao, addTransacao, editTransacao, removeTransacao } = require('../controllers/TransacaoController');

const router = express.Router();

router.get('/transacoes/:id', getTransacao);
router.post('/transacoes', addTransacao);
router.put('/transacoes/:id', editTransacao);
router.delete('/transacoes/:id', removeTransacao);

module.exports = router;
