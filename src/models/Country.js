

class Country {
    constructor({id,guid, name, iso_code, alpha1, alpha2 }) {
        this.id = id
        this.guid = guid
        this.name = name;
        this.iso_code = iso_code;
        this.alpha1 = alpha1;
        this.alpha2 = alpha2;
    }

    toJSON() {
        return {
            guid: this.guid,
            name: this.name,
            iso_code: this.iso_code,
            alpha1: this.alpha1,
            alpha2: this.alpha2
        };
    }
}

module.exports = Country;
