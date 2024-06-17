const express = require('express');
const { getPerfil, addPerfil, editPerfil, removePerfil } = require('../controllers/PerfilController');

const router = express.Router();

router.get('/perfis/:id', getPerfil);
router.post('/perfis', addPerfil);
router.put('/perfis/:id', editPerfil);
router.delete('/perfis/:id', removePerfil);

module.exports = router;
