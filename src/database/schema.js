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

async function syncDatabase() {

    await db`
        CREATE TABLE IF NOT EXISTS countries (
            id         SERIAL PRIMARY KEY,
            guid       TEXT UNIQUE NOT NULL,
            name       TEXT NOT NULL,
            iso_code   TEXT UNIQUE NOT NULL,
            alpha1     TEXT UNIQUE NOT NULL,
            alpha2     TEXT UNIQUE NOT NULL,
            flag       TEXT NULL,
            time_zone  TEXT NOT NULL,
            lexion_ref TEXT NOT NULL,
            is_activated BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_at  TIMESTAMP
        );
    `;

    await db`
        CREATE TABLE IF NOT EXISTS cities (
            id           SERIAL PRIMARY KEY,
            guid         TEXT UNIQUE NOT NULL,
            name         TEXT NOT NULL,
            country_code TEXT NOT NULL,
            country_id   INTEGER NOT NULL,
            created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_at    TIMESTAMP,
            CONSTRAINT fk_city_country
                FOREIGN KEY (country_id)
                REFERENCES countries(id)
                ON DELETE CASCADE
        );
    `;

    await db`
        CREATE TABLE IF NOT EXISTS contacts (
            id           SERIAL PRIMARY KEY,
            guid         UUID NOT NULL UNIQUE,
            name         TEXT NOT NULL,
            mobile       TEXT NOT NULL UNIQUE,
            whatsapp     TEXT UNIQUE,
            email        TEXT UNIQUE,
            location     TEXT,
            city_id      INTEGER NOT NULL,
            gender       CHAR(1) CHECK (gender IN ('M','F')),
            is_activated BOOLEAN DEFAULT true,
            is_deleted   BOOLEAN DEFAULT false,
            is_blocked   BOOLEAN DEFAULT false,
            created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at   TIMESTAMP,
            deleted_at   TIMESTAMP,
            CONSTRAINT fk_city
                FOREIGN KEY(city_id)
                REFERENCES cities(id)
                ON DELETE RESTRICT
        );
    `;

    await db`CREATE UNIQUE INDEX IF NOT EXISTS idx_contacts_email    ON contacts(email)    WHERE is_deleted = false;`;
    await db`CREATE UNIQUE INDEX IF NOT EXISTS idx_contacts_mobile   ON contacts(mobile)   WHERE is_deleted = false;`;
    await db`CREATE UNIQUE INDEX IF NOT EXISTS idx_contacts_whatsapp ON contacts(whatsapp) WHERE is_deleted = false;`;

    await db`
        CREATE TABLE IF NOT EXISTS profiles (
            id         SERIAL PRIMARY KEY,
            guid       UUID NOT NULL UNIQUE,
            name       TEXT NOT NULL,
            code       TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        );
    `;

    await db`
        CREATE TABLE IF NOT EXISTS users (
            id             SERIAL PRIMARY KEY,
            guid           UUID NOT NULL UNIQUE,
            mobile         TEXT NOT NULL UNIQUE,
            code           TEXT NULL,
            password       TEXT NOT NULL,
            contact_id     INTEGER NOT NULL,
            profile_id     INTEGER NOT NULL,
            is_active      BOOLEAN DEFAULT false,
            is_blocked     BOOLEAN DEFAULT false,
            is_deleted     BOOLEAN DEFAULT false,
            created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at     TIMESTAMP,
            deleted_at     TIMESTAMP,
            last_login     TIMESTAMP,
            otp_expires_at TIMESTAMP,
            CONSTRAINT fk_contact
                FOREIGN KEY(contact_id)
                REFERENCES contacts(id)
                ON DELETE CASCADE,
            CONSTRAINT fk_profile
                FOREIGN KEY(profile_id)
                REFERENCES profiles(id)
                ON DELETE RESTRICT
        );
    `;



    console.log('✅ Database synchronized');
}

module.exports = syncDatabase;