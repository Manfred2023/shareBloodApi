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
