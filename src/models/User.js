const { randomUUID } = require('crypto');

class User {
    constructor({ mobile,code, otp_expires_at, password, contact_id, profile_id,is_active = true }) {
        this.guid = randomUUID();
        this.mobile = mobile;
        this.code = code;
        this.otp_expires_at = otp_expires_at;
        this.password = password;
        this.contact_id = contact_id;
        this.profile_id = profile_id;
        this.is_active = is_active;
    }
}

module.exports = User;
