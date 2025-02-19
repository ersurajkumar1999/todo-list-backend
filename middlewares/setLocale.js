const i18n = require('../config/i18n-setup'); // Ensure this path is correct

// const { findUserById } = require('../services/userServices');

const setLocale = async (req, res, next) => {
    if (req.user) {
        const user = await findUserById(req.user.id);
        if (user && user.language) {
            req.setLocale(user.language);
        }
    }
    next();
};

module.exports = setLocale;