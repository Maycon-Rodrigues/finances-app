const router = require('express').Router();

const service = require('../services/transactionService');

router.get('/', service.getAll);
router.post('/create', service.create);
router.patch('/update/:id', service.update);
router.delete('/delete/:id', service.delete);

module.exports = router;
