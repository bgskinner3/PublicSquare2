const Sequelize = require('sequelize');
const db = require('../db');

const BountyVote = db.define('bountyvote', {
  positiveVote: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  negativeVote: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = { BountyVote };
