const CountryService = require('../services/CountryService');
const Reply = require('../shared/Reply');

class CountryController {

    async create(req, res) {
        try {
            const country = await CountryService.create(req.body);

            return res.status(201).json(
                Reply.success('Country created successfully', country.toJSON())
            );

        } catch (e) {
            return res.status(400).json(
                Reply.error(e.message)
            );
        }
    }

    async getAll(req, res) {
        try {
            const countries = await CountryService.getAll();

            return res.json(
                Reply.success('Countries fetched successfully', countries)
            );

        } catch (e) {
            return res.status(500).json(
                Reply.error('Failed to fetch countries', e.message)
            );
        }
    }

    async getByGuid(req, res) {
        try {
            const { guid } = req.params;

            const country = await CountryService.getByGuid(guid);

            return res.json(
                Reply.success('Country fetched successfully', country.toJSON())
            );

        } catch (e) {
            return res.status(404).json(
                Reply.error(e.message)
            );
        }
    }

    async update(req, res) {
        try {
            const { guid } = req.params;

            const country = await CountryService.update(guid, req.body);

            return res.json(
                Reply.success('Country updated successfully', country)
            );

        } catch (e) {
            return res.status(400).json(
                Reply.error(e.message)
            );
        }
    }

    async delete(req, res) {
        try {
            const { guid } = req.params;

            await CountryService.delete(guid);

            return res.json(
                Reply.success('Country deleted successfully')
            );

        } catch (e) {
            return res.status(404).json(
                Reply.error(e.message)
            );
        }
    }
}

module.exports = new CountryController();
