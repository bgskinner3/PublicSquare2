const Sequelize = require('sequelize');
const db = require('../db');


const Bounty = db.define('bounty', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  link: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  reward: {
    type: Sequelize.DECIMAL(100, 8),
    allowNull: false,
    validate: {
      max: 100,
      min: 0,
    },
  },
  image: {
    type: Sequelize.STRING,
  },
  fakeorreal: {
    type: Sequelize.ENUM('real', 'fake', 'pending'),
  },
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
  category: {
    type: Sequelize.ENUM(
      'health',
      'politics',
      'technology',
      'world',
      'business',
      'entertainment',
      'fintech'
    ),
  },
});

module.exports = { Bounty };