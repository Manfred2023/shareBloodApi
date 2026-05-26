// src/middlewares/auth.middleware.js
const AuthService = require('../services/AuthService');
const Reply = require('../shared/Reply');

exports.authRequired = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json(Reply.error('Authorization header missing'));
        }

        const token = authHeader.split(' ')[1];
        req.user = await AuthService.verifyToken(token);

        next();
    } catch (e) {
        return res.status(401).json(Reply.error(e.message));
    }
};
exports.sudoOnly = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json(
                Reply.error('Unauthenticated')
            );
        }

        const profile = req.user.pg;

        if (!profile) {
            return res.status(403).json(
                Reply.error('Profile not found in token')
            );
        }

        const allowedProfiles = ['Sudo'];

        if (!allowedProfiles.includes(profile)) {
            return res.status(403).json(
                Reply.error('Access denied')
            );
        }

        next();
    } catch (e) {
        return res.status(500).json(
            Reply.error('Role verification failed', e.message)
        );
    }
};
exports.promoterOnly = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json(
                Reply.error('Unauthenticated')
            );
        }

        const profile = req.user.pg;

        if (!profile) {
            return res.status(403).json(
                Reply.error('Profile not found in token')
            );
        }

        const allowedProfiles = ['Promotor'];

        if (!allowedProfiles.includes(profile)) {
            return res.status(403).json(
                Reply.error('Access denied')
            );
        }

        next();
    } catch (e) {
        return res.status(500).json(
            Reply.error('Role verification failed', e.message)
        );
    }
};
