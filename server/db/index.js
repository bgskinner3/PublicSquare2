const db = require('./db');
const { Bounty } = require('./models/Bounty');
const { User } = require('./models/User');
const { Message } = require('./models/Message');
const { Conversation } = require('./models/Conversation');
const { UserToConversation } = require('./models/UserToConversation');
const { NewsSource } = require('./models/NewsSource');
const { BountyVote  } = require('./models/BountyVote');


User.hasMany(Bounty);
Bounty.belongsTo(User);

User.hasMany(BountyVote)
BountyVote.belongsTo(User)

Bounty.hasMany(BountyVote)
BountyVote.belongsTo(Bounty)

NewsSource.hasMany(Bounty);
Bounty.belongsTo(NewsSource);

//message system below simple version
User.hasMany(UserToConversation);
UserToConversation.belongsTo(User);

Conversation.hasMany(UserToConversation);
UserToConversation.belongsTo(Conversation);

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

User.hasMany(Message);
Message.belongsTo(User);

module.exports = {
  Bounty,
  User,
  Message,
  Conversation,
  UserToConversation,
  NewsSource,
  BountyVote,
  db
}