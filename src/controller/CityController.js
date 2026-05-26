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

const CityService = require('../services/CityService');
const Reply = require('../shared/Reply');

class CityController {

    async create(req, res) {
        try {
            const city = await CityService.create(req.body);

            return res.status(201).json(
                Reply.success('City created successfully', city)
            );
        } catch (e) {
            return res.status(400).json(
                Reply.error(e.message)
            );
        }
    }

    async getAll(req, res) {
        try {
            const cities = await CityService.getAll();

            return res.json(
                Reply.success('Cities fetched successfully', cities)
            );
        } catch (e) {
            return res.status(500).json(
                Reply.error('Failed to fetch cities', e.message)
            );
        }
    }

    async getByGuid(req, res) {
        try {
            const city = await CityService.getByGuid(req.params.guid);

            return res.json(
                Reply.success('City fetched successfully', city)
            );
        } catch (e) {
            return res.status(404).json(
                Reply.error(e.message)
            );
        }
    }
    async getByCitiesbyCountry(req, res) {
        try {
            const city = await CityService.getCitiesByCountry(req.params.guid);

            return res.json(
                Reply.success('City fetched successfully', city)
            );
        } catch (e) {
            return res.status(404).json(
                Reply.error(e.message)
            );
        }
    }

    async update(req, res) {
        try {
            const city = await CityService.update(
                req.params.guid,
                req.body
            );

            return res.json(
                Reply.success('City updated successfully', city)
            );
        } catch (e) {
            return res.status(400).json(
                Reply.error(e.message)
            );
        }
    }

    async delete(req, res) {
        try {
            await CityService.delete(req.params.guid);

            return res.json(
                Reply.success('City deleted successfully')
            );
        } catch (e) {
            return res.status(404).json(
                Reply.error(e.message)
            );
        }
    }
}

module.exports = new CityController();
