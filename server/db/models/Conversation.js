const Sequelize = require('sequelize');
const db = require('../db');

const Conversation = db.define('conversation', {
  users: {
    type: Sequelize.STRING,

    defaultValue: ''
  },
});

module.exports = { Conversation };
