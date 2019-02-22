const Sequelize = require('sequelize');

const sequelize = new Sequelize('kisaragi', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'kisaragi.sqlite'
  });