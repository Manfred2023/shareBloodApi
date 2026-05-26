// country.routes.js
const router = require('express').Router();
const ctrl = require('../controller/CountryController');

const {authRequired, sudoOnly} = require("../middlewares/AuthMiddleware");

router.post('/', sudoOnly, ctrl.create);
router.get('/', ctrl.getAll);
router.get('/:guid', sudoOnly, ctrl.getByGuid);
router.put('/:guid',  sudoOnly, ctrl.update);
router.delete('/:guid',  sudoOnly, ctrl.delete);

module.exports = router;
