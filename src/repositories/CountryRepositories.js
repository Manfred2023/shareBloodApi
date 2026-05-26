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

const db = require('../config/database');
const Country = require('../models/Country');

class CountryRepository {

    /**
     * Create country
     */
    async create(country) {
        await db`
            INSERT INTO countries (
                guid,
                name,
                iso_code,
                alpha1,
                alpha2
            ) VALUES (
                ${country.guid},
                ${country.name},
                ${country.iso_code},
                ${country.alpha1},
                ${country.alpha2}
            );
        `;
    }

    /**
     * Find country by guid
     */
    async findByGuid(guid) {

        const result = await db`
            SELECT *
            FROM countries
            WHERE guid = ${guid};
        `
        if (!result.length) return null;

        return result[0];
    }

    /**
     * Find by ISO code OR alpha2 (duplicate check)
     */
    async findByISOOrAlpha2(iso_code, alpha2, excludeGuid = null) {
        let result;
        if (excludeGuid) {
            result = await db`
                SELECT *
                FROM countries
                WHERE (iso_code = ${iso_code} OR alpha2 = ${alpha2})
                  AND guid <> ${excludeGuid};
            `;
        } else {
            result = await db`
                SELECT *
                FROM countries
                WHERE iso_code = ${iso_code} OR alpha2 = ${alpha2};
            `;
        }

        return result.length ? new Country(result[0]) : null;
    }

    /**
     * Get all countries
     */
    async findAll() {
        const result = await db`
            SELECT *
            FROM countries
            ORDER BY name ASC;
        `;
        return result.map(row => new Country(row).toJSON());
    }

    /**
     * Update country by guid
     */
    async updateByGuid(guid, data) {
        await db`
            UPDATE countries
            SET
                name = ${data.name},
                iso_code = ${data.iso_code},
                alpha1 = ${data.alpha1},
                alpha2 = ${data.alpha2}
            WHERE guid = ${guid};
        `;
    }

    /**
     * Delete country by guid
     */
    async deleteByGuid(guid) {
        await db`
            DELETE FROM countries
            WHERE guid = ${guid};
        `;
    }
}

module.exports = new CountryRepository();
