const Sequelize = require('sequelize');
const db = require('../db');

const NewsSource = db.define('newssource', {
  image: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  pagelink: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUrl: true,
    },
  },
});

module.exports = { NewsSource };
