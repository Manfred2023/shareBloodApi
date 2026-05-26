/*
 * ============================================================
 *  Projet     : ShareBlood - API
 *  Version    : 1.0.0
 *  Auteur     : Manfred MOUKATE <moukatemanfred@gmail.com>
 *  Créé le    : 26/05/2026, 21:13
 *  Modifié le : 26/05/2026, 21:13
 *
 *  Copyright (c)
 *  Licence    : Propriétaire — toute reproduction interdite
 *               sans autorisation écrite de l'auteur.
 *  ============================================================
 */

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

