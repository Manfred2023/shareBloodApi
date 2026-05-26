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

const CountryRepository = require('../repositories/CountryRepositories');
const { randomUUID } = require('crypto');
const Country = require('../models/Country');

class CountryService {


    async create(data) {
        const { name, iso_code, alpha1, alpha2 } = data;

        if (!name || !iso_code || !alpha1 || !alpha2) {
            throw new Error('Missing required fields');
        }

        // 🔎 Duplicate check
        const duplicate = await CountryRepository.findByISOOrAlpha2(
            iso_code,
            alpha2
        );

        if (duplicate) {
            throw new Error('Country with same ISO code or alpha2 already exists');
        }
        const guid = randomUUID();
        const country = new Country({
            guid,
            name,
            iso_code,
            alpha1,
            alpha2
        });

        await CountryRepository.create(country);

        return country;
    }

    /**
     * Get all countries
     */
    async getAll() {
        return await CountryRepository.findAll();
    }

    /**
     * Get country by guid
     */
    async getByGuid(guid) {
        const country = await CountryRepository.findByGuid(guid);

        if (!country) {
            throw new Error('Country not found');
        }

        return country;
    }

    /**
     * Update country
     */
    async update(guid, data) {
        const existing = await CountryRepository.findByGuid(guid);

        if (!existing) {
            throw new Error('Country not found');
        }

        const duplicate = await CountryRepository.findByISOOrAlpha2(
            data.iso_code,
            data.alpha2,
            guid
        );

        if (duplicate) {
            throw new Error('Another country with same ISO code or alpha2 exists');
        }

        await CountryRepository.updateByGuid(guid, {
            name: data.name,
            iso_code: data.iso_code,
            alpha1: data.alpha1,
            alpha2: data.alpha2
        });

        return {
            ...existing,
            ...data
        };
    }

    /**
     * Delete country
     */
    async delete(guid) {
        const existing = await CountryRepository.findByGuid(guid);

        if (!existing) {
            throw new Error('Country not found');
        }

        await CountryRepository.deleteByGuid(guid);
    }
}

module.exports = new CountryService();
