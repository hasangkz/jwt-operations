const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Yetkisiz işlem');
  try {
    const validate = jwt.verify(token, process.env.TOKEN);
    console.log(validate);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
