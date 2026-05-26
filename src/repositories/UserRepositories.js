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

// src/repositories/user.repository.js
const db = require('../config/database');

class UserRepository {

    static async findByGuid(guid) {
        const result = await db`
            SELECT
                u.id,
                u.guid AS user_guid,
                u.mobile,
                u.password,
                u.is_active,
                u.is_blocked,
                u.created_at AS user_created_at,
                u.last_login,

                -- Contact
                c.guid AS contact_guid,
                c.name, 
                c.mobile AS contact_mobile,
                c.email,
                c.whatsapp,
                c.location,
                c.gender,
                c.is_activated AS contact_is_activated,

                -- City
                ci.guid AS city_guid,
                ci.name AS city_name,

                -- Country
                co.guid AS country_guid,
                co.name AS country_name,
                co.iso_code,
                co.alpha1,
                co.alpha2,

                -- Profile
                p.guid AS profile_guid,
                p.name AS profile_name,
                p.code AS profile_code

            FROM users u
            JOIN contacts c ON c.id = u.contact_id
            JOIN cities ci ON ci.id = c.city_id
            JOIN countries co ON co.id = ci.country_id
            JOIN profiles p ON p.id = u.profile_id
            WHERE u.guid = ${guid};
        `;
        const row = result[0];
        if (!row) return null;

        return {
            id: row.id,
            guid: row.user_guid,
            mobile: row.mobile,
            password: row.password,
            is_active: row.is_active,
            is_blocked: row.is_blocked,
            created_at: row.user_created_at,
            last_login: row.last_login,
            contact: {
                guid: row.contact_guid,
                name: row.name,
                mobile: row.contact_mobile,
                email: row.email,
                whatsapp: row.whatsapp,
                location: row.location,
                gender: row.gender,
                is_activated: row.contact_is_activated,
                city: {
                    guid: row.city_guid,
                    name: row.city_name,
                    country: {
                        guid: row.country_guid,
                        name: row.country_name,
                        iso_code: row.iso_code,
                        alpha1: row.alpha1,
                        alpha2: row.alpha2
                    }
                }
            },
            profile: {
                guid: row.profile_guid,
                name: row.profile_name,
                code: row.profile_code
            }
        };
    }

    static async findByMobile(mobile) {
        const result = await db`
            SELECT
                u.guid AS user_guid,
                u.mobile,
                u.password,
                u.is_active,
                u.is_blocked,
                u.created_at AS user_created_at,
                u.last_login,

                -- Contact
                c.guid AS contact_guid, 
                c.name,
                c.mobile AS contact_mobile,
                c.email,
                c.whatsapp,
                c.location,
                c.gender,
                c.is_activated AS contact_is_activated,

                -- City
                ci.guid AS city_guid,
                ci.name AS city_name,

                -- Country
                co.guid AS country_guid,
                co.name AS country_name,
                co.iso_code,
                co.alpha1,
                co.alpha2,

                -- Profile
                p.guid AS profile_guid,
                p.name AS profile_name,
                p.code AS profile_code

            FROM users u
            JOIN contacts c ON c.id = u.contact_id
            JOIN cities ci ON ci.id = c.city_id
            JOIN countries co ON co.id = ci.country_id
            JOIN profiles p ON p.id = u.profile_id
            WHERE u.mobile = ${mobile} AND u.is_deleted = false;
        `;
        const row = result[0];
        if (!row) return null;

        return {
            guid: row.user_guid,
            mobile: row.mobile,
            password: row.password,
            is_active: row.is_active,
            is_blocked: row.is_blocked,
            created_at: row.user_created_at,
            last_login: row.last_login,
            contact: {
                guid: row.contact_guid,
                name: row.name,
                mobile: row.contact_mobile,
                email: row.email,
                whatsapp: row.whatsapp,
                location: row.location,
                gender: row.gender,
                is_activated: row.contact_is_activated,
                city: {
                    guid: row.city_guid,
                    name: row.city_name,
                    country: {
                        guid: row.country_guid,
                        name: row.country_name,
                        iso_code: row.iso_code,
                        alpha1: row.alpha1,
                        alpha2: row.alpha2
                    }
                }
            },
            profile: {
                guid: row.profile_guid,
                name: row.profile_name,
                code: row.profile_code
            }
        };
    }
    static async findByEmail(email) {
        const result = await db`
            SELECT
                u.guid AS user_guid,
                u.mobile,
                u.code,
                u.password,
                u.is_active,
                u.is_blocked,
                u.created_at AS user_created_at,
                u.last_login,
                u.otp_expires_at,

                -- Contact
                c.guid AS contact_guid, 
                c.name,
                c.mobile AS contact_mobile,
                c.email,
                c.whatsapp,
                c.location,
                c.gender,
                c.is_activated AS contact_is_activated,

                -- City
                ci.guid AS city_guid,
                ci.name AS city_name,

                -- Country
                co.guid AS country_guid,
                co.name AS country_name,
                co.iso_code,
                co.alpha1,
                co.alpha2,

                -- Profile
                p.guid AS profile_guid,
                p.name AS profile_name,
                p.code AS profile_code

            FROM users u
            JOIN contacts c ON c.id = u.contact_id
            JOIN cities ci ON ci.id = c.city_id
            JOIN countries co ON co.id = ci.country_id
            JOIN profiles p ON p.id = u.profile_id
            WHERE c.email = ${email} AND u.is_active = false;
        `;


        const row = result[0];
        if (!row) return null;

        return {
            guid: row.user_guid,
            mobile: row.mobile,
            password: row.password,
            code: row.code,
            is_active: row.is_active,
            is_blocked: row.is_blocked,
            otp_expires_at: row.otp_expires_at,
            created_at: row.user_created_at,
            last_login: row.last_login,
            contact: {
                guid: row.contact_guid,
                name: row.name,
                mobile: row.contact_mobile,
                email: row.email,
                whatsapp: row.whatsapp,
                location: row.location,
                gender: row.gender,
                is_activated: row.contact_is_activated,
                city: {
                    guid: row.city_guid,
                    name: row.city_name,
                    country: {
                        guid: row.country_guid,
                        name: row.country_name,
                        iso_code: row.iso_code,
                        alpha1: row.alpha1,
                        alpha2: row.alpha2
                    }
                }
            },
            profile: {
                guid: row.profile_guid,
                name: row.profile_name,
                code: row.profile_code
            }
        };
    }

    static async create(user) {
        const result = await db`
            INSERT INTO users (guid, mobile,code, password, contact_id, profile_id, is_active,otp_expires_at) 
            VALUES (${user.guid}, ${user.mobile}, ${user.code},${user.password},  ${user.contact_id}, ${user.profile_id}, ${user.is_active},${user.otp_expires_at})
            RETURNING *;
        `;
        return result[0];
    }

    static async getAll() {
        return db`
            SELECT  
                u.guid,
                u.mobile,
                u.is_active,
                u.created_at,
                c.guid AS contact_guid,
                c.name, 
                c.email,
                p.guid AS profile_guid,
                p.name AS profile_name,
                p.code AS profile_code
            FROM users u
            JOIN contacts c ON c.id = u.contact_id
            JOIN profiles p ON p.id = u.profile_id
         
            ORDER BY u.created_at DESC;
        `;
    }

    static async updateStatus(guid, is_active) {
        await db`
            UPDATE users
            SET is_active = ${is_active}
            WHERE guid = ${guid};
        `;
    }

    static async updateLastLogin(guid) {
        await db`
            UPDATE users
            SET last_login = CURRENT_TIMESTAMP
            WHERE guid = ${guid};
        `;
    }

    static async activeAccount(guid) {
        await db`
            UPDATE users
            SET is_active = true,
                updated_at = CURRENT_TIMESTAMP
            WHERE guid = ${guid};
        `;
    }

    static async resendCode(guid, codeU,otp_expires_atU) {
        await db`
            UPDATE users 
            SET code = ${codeU},
                otp_expires_at = ${otp_expires_atU} 
            WHERE guid = ${guid};
        `;
    }

    static async delete(guid) {
        await db`
            DELETE FROM users
            WHERE guid = ${guid};
        `;
    }
}

module.exports = UserRepository;
