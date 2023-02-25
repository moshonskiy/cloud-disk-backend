const { body } = require('express-validator');

const registerValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password should be 5 characters min').isLength({ min: 5 }),
];

module.exports = {
    registerValidation,
}
