const { randomUUID } = require('crypto');

class City {
    constructor({ name, country_id }) {
        this.guid = randomUUID();
        this.name = name;
        this.country_id = country_id;
    }
}

module.exports = City;
