const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const { regexForUrl } = require('../utils/constants');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexForUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), createUser);

module.exports = router;
