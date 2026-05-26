// src/services/auth.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepositories');

class AuthService {

    static async login({ mobile, password }) {
        if (!mobile || !password) {
            throw new Error('Mobile and password are required');
        }

        const user = await UserRepository.findByMobile(mobile);
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.is_active) throw new Error('User is inactive');
        if (user.is_blocked) throw new Error('User is blocked');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        await UserRepository.updateLastLogin(user.guid);

        const tokenPayload = { ug: user.guid, pg: user.profile.name };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        delete user.password;
        delete user.profile.code;

        return {
            token,
            user
        };
    }

    static async checkIfUserExist({ mobile }) {
        if (!mobile ) {
            throw new Error('Mobile is required');
        }

        const user = await UserRepository.findByMobile(mobile);
        if (!user) {
            throw new Error('User not found');
        }

        //if (!user.is_active) throw new Error('User is inactive');
        if (user.is_blocked) throw new Error('User is blocked');

        delete user.password;
        return user
    }
    static async me( guid ) {

        const user = await UserRepository.findByGuid(guid);
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.is_active) throw new Error('User is inactive');
        if (user.is_blocked) throw new Error('User is blocked');

        delete user.password;
        delete user.profile;
        delete user.id;

        return {
            user
        };
    }


    static async verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            throw new Error('Invalid or expired token');
        }
    }
}

module.exports = AuthService;
