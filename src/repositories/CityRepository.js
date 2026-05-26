const db = require('../config/database');

class CityRepository {

    async create(city) {
        await db`
            INSERT INTO cities (guid, name, country_id)
            VALUES (${city.guid}, ${city.name}, ${city.country_id});
        `;
    }

    async findAll() {
        return db`
            SELECT ci.guid,
                   ci.name,
                   co.guid AS country_guid,
                   co.name AS country_name
            FROM cities ci
                     JOIN countries co ON co.id = ci.country_id
            ORDER BY ci.name;
        `; // postgres renvoie déjà un array
    }

    async findByGuid(guid) {
        const result = await db`
            SELECT 
                ci.id,
                ci.guid,
                ci.name,
                co.guid AS country_guid,
                co.name AS country_name
            FROM cities ci
            JOIN countries co ON co.id = ci.country_id
            WHERE ci.guid = ${guid};
        `;
        return result[0]; // un seul élément
    }

    async findCitiesByCountry(countryId) {
        const result = await db`
            SELECT id,
                   guid,
                   name
            FROM cities
            WHERE country_id = ${countryId};
        `;
        return result;
    }

    async existsInCountry(name, country_id) {
        const result = await db`
            SELECT id FROM cities
            WHERE name = ${name} AND country_id = ${country_id};
        `;
        return result.length > 0;
    }

    async update(guid, name, country_id) {
        await db`
            UPDATE cities
            SET name = ${name}, country_id = ${country_id}
            WHERE guid = ${guid};
        `;
    }

    async delete(guid) {
        await db`
            DELETE FROM cities
            WHERE guid = ${guid};
        `;
    }
}

module.exports = new CityRepository();
