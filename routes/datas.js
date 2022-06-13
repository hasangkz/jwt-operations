const express = require('express');
const router = express.Router();
const verify = require('./tokenValidate');

router.get('/', verify, (req, res) => {
  res.json({
    data: {
      baslik: 'hezimet',
      aciklama: 'gaflet',
    },
  });
});

module.exports = router;
