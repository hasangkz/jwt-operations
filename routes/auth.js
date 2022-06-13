const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const validateScheme = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
});

//LOGIN SCHEMA
const validateLoginScheme = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
});

//REGISTER
router.post('/register', async (req, res) => {
  //  doğrulama işleminin kodu => res.send(validateScheme.validate(req.body));

  //Şema doğrulama yeri
  const { error } = validateScheme.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //Eposta doğrulama yeri

  const mailValidate = await User.findOne({ email: req.body.email });

  if (mailValidate)
    return res
      .status(400)
      .send('Böyle bir mail adresi sistemimizde zaten kayıtlı!');

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  const { error } = validateLoginScheme.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //Kullanıcıyı db'de bulma
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Giriş bilgisi yanlış!');

  const password = await User.findOne({ password: req.body.password });
  if (!password) return res.status(400).send('Giriş bilgisi yanlış!');

  //JWT OLUŞTURMA İŞLEMİ
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
  //jwt.sign() ile token oluştururuz. => 1.ifade payload 2.ifade secret key
  //biz payload olarak burada kullanıcı id'sini gönderdik
  //secret key olarak da .env'de tanımladığımız TOKEN'i yazdık

  res.header('auth-token', token).send(token);
  //Başlık bilgisinde tokeni tutmak istiyorum

  res.send('giriş başarılı br şekilde yapıldı');
});

module.exports = router;
