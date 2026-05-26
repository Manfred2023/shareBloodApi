const router = require('express').Router();
const ctrlCity = require('../controller/CityController');
const {authRequired, sudoOnly} = require("../middlewares/AuthMiddleware");

router.post('/',authRequired,sudoOnly, ctrlCity.create);
//router.get('/',sudoOnly, ctrlCity.getAll);
//router.get('/:guid',sudoOnly,ctrlCity.getByGuid);
router.get('/by-country/:guid', ctrlCity.getByCitiesbyCountry);
router.put('/:guid',authRequired,sudoOnly,ctrlCity.update);
router.delete('/:guid',authRequired,sudoOnly,ctrlCity.delete);

module.exports = router;

