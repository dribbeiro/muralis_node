const router = require('express').Router();
const DespesasController = require('./../controllers/DespesasController')

const despesasController = new DespesasController();

router.get('/', (req, res) => despesasController.get(req, res))
router.post('/', (req, res) => despesasController.create(req, res))
router.put('/:id', (req, res) => despesasController.update(req, res))
router.patch('/:id', (req, res) => despesasController.patch(req, res))
router.delete('/:id', (req, res) => despesasController.delete(req, res))
router.get('/pdf', (req, res) => despesasController.getPDF(req, res))
router.get('/excel', (req, res) => despesasController.getSpreadSheet(req, res))

module.exports = router