const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

module.exports = async (token) => {
  try {
    if (token) {
      const { id } = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
      const user = await User.findOne({
        where: {
          id: id,
        },
      });
      return user;
    }
    return null;
  } catch (error) {
    console.error('ERRRRRRRR', error);
    return null;
  }
};
