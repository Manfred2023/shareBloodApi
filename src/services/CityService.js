const CityRepository = require('../repositories/CityRepository');
const CountryRepository = require('../repositories/CountryRepositories');
const City = require('../models/City');
const {randomUUID} = require("crypto");

class CityService {

    async create({ name, country_guid }) {
        if (!name || !country_guid) {
            throw new Error('Missing required fields');
        }

        const country = await CountryRepository.findByGuid(country_guid);
        if (!country) {
            throw new Error('Country not found');
        }

        const exists = await CityRepository.existsInCountry(name, country.id);
        if (exists) {
            throw new Error('City already exists in this country');
        }
        const guid = randomUUID();
        const city = new City({
            guid,
            name,
            country_id: country.id
        });
        await CityRepository.create(city);

        return {
            guid: city.guid,
            name: city.name,
            country: {
                guid: country.guid,
                name: country.name
            }
        };
    }

    async getAll() {
        const cities = await CityRepository.findAll();

        return cities.map(ci => ({
            guid: ci.guid,
            name: ci.name,
            country: {
                guid: ci.country_guid,
                name: ci.country_name
            }
        }));
    }

    async getByGuid(guid) {
        const city = await CityRepository.findByGuid(guid);

        if (!city) {
            throw new Error('City not found');
        }

        return {
            guid: city.guid,
            name: city.name,
            country: {
                guid: city.country_guid,
                name: city.country_name
            }
        };
    }

    async getCitiesByCountry(countryGuid) {


        const  country =  await CountryRepository.findByGuid(countryGuid)

        const cities = await CityRepository.findCitiesByCountry(country.id);

        if (!cities) {
            throw new Error('City not found');
        }

        return cities.map(ci => ({
            guid: ci.guid,
            name: ci.name,
        }));

    }

    async update(guid, { name, country_guid }) {
        const city = await CityRepository.findByGuid(guid);
        if (!city) {
            throw new Error('City not found');
        }

        const country = await CountryRepository.findByGuid(country_guid);
        if (!country) {
            throw new Error('Country not found');
        }

        await CityRepository.update(guid, name, country.id);

        return {
            guid,
            name,
            country: {
                guid: country.guid,
                name: country.name
            }
        };
    }

    async delete(guid) {
        const city = await CityRepository.findByGuid(guid);
        if (!city) {
            throw new Error('City not found');
        }

        await CityRepository.delete(guid);
    }
}

module.exports = new CityService();
