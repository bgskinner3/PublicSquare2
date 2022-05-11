const db = require('../db');

const UserToConversation = db.define('usertoconversation');
module.exports = { UserToConversation };
