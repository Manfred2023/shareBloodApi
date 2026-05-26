/*
 * ============================================================
 *  Projet     : ShareBlood - API
 *  Version    : 1.0.0
 *  Auteur     : Manfred MOUKATE <moukatemanfred@gmail.com>
 *  Créé le    : 26/05/2026, 21:14
 *  Modifié le : 26/05/2026, 21:14
 *
 *  Copyright (c)
 *  Licence    : Propriétaire — toute reproduction interdite
 *               sans autorisation écrite de l'auteur.
 *  ============================================================
 */

class Reply {
    static success(message, data = null) {
        return { success: true, message, data };
    }

    static error(message, error = null) {
        return { success: false, message, error };
    }
}

module.exports = Reply;
