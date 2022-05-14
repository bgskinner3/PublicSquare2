const Sequelize = require('sequelize');
const db = require('../db');

const Conversation = db.define('conversation', {
  users: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: ''
  },
});

module.exports = { Conversation };
