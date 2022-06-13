const express = require('express');
const app = express();
const router = require('./routes/auth');
const dataRouter = require('./routes/datas');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json()); //req.body bilgisini okuyabilmek için: express.json() middlewareini kullandık

app.use('/api/user', router);
app.use('/api/datas', dataRouter);

//MONGODB-MONGOOSE BAĞLANTISI
// const DB =
//   'mongodb+srv://hasangkz:11235@cluster0.1utqsyv.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(process.env.DB_CONNECT)
  .then((res) => {
    console.log('bağlantı kuruldu');
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
