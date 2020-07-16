require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const contactsRouter = require('./routes/contacts.router');
const authRouter = require('./routes/auth.router');

const createServer = async () => {
  try {
    const app = express();
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Mongo Database connection successful!');

    app.use(cors());

    app.use(morgan('tiny'));

    app.use('/', express.static('public'));

    app.use(express.json());

    app.use('/api/contacts', contactsRouter);
    app.use('/auth', authRouter);

    app.listen(3000, () => console.log(`\x1B[33mServer listening on port: 3000... \x1b[0m`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

createServer();
