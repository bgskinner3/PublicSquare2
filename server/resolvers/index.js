const { User } = require('../db/models/User');
const { Bounty } = require('../db/models/Bounty');
const { NewsSource } = require('../db/models/NewsSource');
const { BountyVote } = require('../db/models/BountyVote');
const { Conversation } = require('../db/models/Conversation');
const { UserToConversation } = require('../db/models/UserToConversation');
const { Message } = require('../db/models/Message');
const { GraphQLUpload } = require('graphql-upload');
const { GraphQLScalarType, Kind } = require('graphql');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { PubSub } = require('graphql-subscriptions');
//const { RedisPubSub } = require('graphql-redis-subscriptions')

//here we are providing more security for users added images.
//sometimes the file can be something private.
// this also aviods two files that are uploaded that may have the same name
const generateRandomString = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

//for subscriptions
//const pubsub = new RedisPubSub();
const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const users = await User.findAll();
      return users;
    },
    user: async (parent, args, context) => {
      const { id } = jwt.verify(args.token, process.env.REACT_APP_JWT_SECRET);
      console.log(id);
      const user = await User.findByPk(id);
      return user;
    },
    bounties: async (parent, args, context) => {
      // if (!context.user) throw new Error('Not authorized')
      const posts = await Bounty.findAll();
      return posts;
    },
    bounty: async (parent, args) => {
      const { bountyId } = args;
      const post = await Bounty.findByPk(bountyId);
      return post;
    },
    newssources: async (parent, args) => {
      const newsSources = await NewsSource.findAll();
      return newsSources;
    },
    newssource: async (parent, args) => {
      const id = args.id;
      const source = await NewsSource.findByPk(id);
      return source;
    },
    bountyvotes: async (parent, args) => {
      const votes = await BountyVote.findAll();
      return votes;
    },
    userbountyvotes: async (parent, args) => {
      const { userId } = args;
      const userVotes = await BountyVote.findAll({
        where: {
          userId: userId,
        },
      });
      return userVotes;
    },
    singlebountyvotes: async (parent, args) => {
      const { bountyId } = args;
      const bountyVotes = await BountyVote.findAll({
        where: {
          bountyId: bountyId,
        },
      });
      return bountyVotes;
    },
    bountyConversation: async (parent, args) => {
      const { bountyId } = args;
      const conversation = await Conversation.findOne({
        where: {
          bountyId: bountyId,
        },
      });
      return conversation;
    },
    conversationMessages: async (parent, args) => {
      const { conversationId } = args;

      const allMessages = await Message.findAll({
        where: {
          conversationId: conversationId,
        },
      });
      return allMessages;
    },
    messages: async (parent, args) => {
      const { conversationId } = args;

      const allMessages = await Message.findAll({
        where: {
          conversationId: conversationId,
        },
      });
      return allMessages;
    },
  },
  Upload: GraphQLUpload,
  Date: dateScalar,
  Mutation: {
    createUser: async (parent, args) => {
      const existingUser = await User.findOne({
        where: {
          username: args.input.username,
        },
      });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const user = await User.create({ ...args.input });
      return user;
    },
    updateUser: async (parent, args) => {
      const { id, newUsername, newPassword } = args.input;
      const user = await User.findByPk(id);
      user.set({
        username: newUsername || user.username,
        password: newPassword || user.password,
      });
      await user.save();
      return user;
    },
    deleteUser: async (parent, args) => {
      const id = args.id;
      const user = await User.findByPk(id);
      await user.destroy();
    },
    login: async (parent, args, context) => {
      try {
        const user = await User.findOne({ where: { username: args.username } });

        if (!user) {
          throw new Error('User does not exist!');
        }

        const isValid = await bcrypt.compare(args.password, user.password);
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.REACT_APP_JWT_SECRET,
          {
            expiresIn: '6h',
          }
        );
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    signup: async (parent, args, context) => {
      try {
        const { req, res } = context;

        const existingUser = await User.findOne({
          where: {
            username: args.username,
          },
        });
        if (existingUser) {
          throw new Error('User exists already.');
        }
        const user = await User.create({ ...args });
        const token = await user.generateToken();

        return {
          user,
          token,
        };
      } catch (error) {
        console.error('signup failed!', error);
      }
    },
    //added creating a conversation as well, as when a bounty is created
    //in addition a conversation is also made
    createBounty: async (parent, args, context) => {
      try {
        const existingBounty = await Bounty.findOne({
          where: {
            link: args.input.link,
          },
        });
        if (existingBounty) {
          throw new Error('That post has already been made');
        }
        const bounty = await Bounty.create({ ...args.input });

        await Conversation.create({
          bountyId: bounty.dataValues.id,
        });

        return bounty;
      } catch (error) {
        console.error(error);
      }
    },
    deleteBounty: async (parent, args) => {
      const id = args.id;
      const post = await Bounty.findByPk(id);
      await post.destroy();
    },

    updateBounty: async (parent, args) => {
      const {
        id,
        newdescription,
        newlink,
        newtitle,
        newreward,
        newpositiveVote,
        newnegativeVote,
        newfakeorreal,
      } = args.input;

      const bounty = await Bounty.findByPk(id);

      bounty.set({
        title: newtitle || bounty.title,
        description: newdescription || bounty.description,
        link: newlink || bounty.link,
        reward: newreward || bounty.reward,
        fakeorreal: newfakeorreal || bounty.fakeorreal,
        positiveVote:
          bounty.positiveVote + newpositiveVote || bounty.positiveVote,
        negativeVote:
          bounty.negativeVote + newnegativeVote || bounty.negativeVote,
      });
      await bounty.save();
      return bounty;
    },
    createNewsSource: async (parent, args, context) => {
      try {
        const existingSource = await NewsSource.findOne({
          where: {
            pagelink: args.input.pagelink,
          },
        });

        if (existingSource) {
          throw new Error('this source already exists');
        }
        const newSource = await NewsSource.create({ ...args.input });
        return { newSource };
      } catch (error) {
        console.error('thiseerrrrrr', error);
      }
    },
    deleteNewsSource: async (parent, args) => {
      const id = args.id;
      const source = await NewsSource.findByPk(id);
      await source.destroy();
    },
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const { ext } = path.parse(filename);
      const randomName = generateRandomString(12) + ext;
      const stream = createReadStream();
      const pathName = path.join(
        __dirname,
        `../../public/newsImages/${randomName}`
      );
      await stream.pipe(fs.createWriteStream(pathName));

      return {
        url: `http://localhost:4000/newsImages/${randomName}`,
      };
    },
    createBountyVote: async (parent, args) => {
      try {
        const { userId, positiveVote, negativeVote, bountyId } = args.input;
        const exisitngUserVote = await BountyVote.findOne({
          where: {
            userId: userId,
            bountyId: bountyId,
          },
          raw: true,
        });

        if (exisitngUserVote) {
          return new Error(' You have already voted on this');
        }
        const vote = await BountyVote.create({
          userId: userId,
          positiveVote: positiveVote || 0,
          negativeVote: negativeVote || 0,
          bountyId: bountyId,
        });

        return vote;
      } catch (error) {
        console.error('vote did not go through', error);
      }
    },
    addUserToConversation: async (parent, args) => {
      try {
        let add = true;
        const { userId, conversationId, bountyId } = args.input;

        const conversation = await Conversation.findOne({
          where: {
            bountyId: bountyId,
          },
        });

        const search = conversation.users.split(' ');
        search.map((user) => {
          if (user === userId) {
            add = false;
          }
        });
        console.log('ids', conversationId, userId);
        if (add) {
          UserToConversation.create({
            ...args.input,
          });

          search.push(userId);

          conversation.set({
            users: search.join(' '),
          });

          await conversation.save();
        }
        return conversation;
      } catch (error) {
        console.error(
          'something happened when adding user to conversation',
          error
        );
      }
    },
    createMessage: async (parent, args) => {
      try {
        console.log('in server message', args);
        let add = true;
        const { content, conversationId, userId } = args.input;
        const conversation = await Conversation.findOne({
          where: {
            id: conversationId,
          },
        });
        const search = conversation.users.split(' ');
        search.map((user) => {
          if (user === userId) {
            add = false;
          }
        });

        if (add) {
          UserToConversation.create({
            userId: userId,
            conversationId: conversationId,
          });

          search.push(userId);

          conversation.set({
            users: search.join(' '),
          });
          await conversation.save();
        }

        const message = await Message.create({ ...args.input });
        
        return message;
      } catch (error) {
        console.error('error with message', error);
      }
    },
    sendMessage: async (parent, args) => {
     try {
      //   let add = true;
      //   const {  conversationId, userId } = args.input;
      //   const conversation = await Conversation.findOne({
      //     where: {
      //       id: conversationId,
      //     },
      //   });
      //   const search = conversation.users.split(' ');
      //   search.map((user) => {
      //     if (user === userId) {
      //       add = false;
      //     }
      //   });

      //   if (add) {
      //     UserToConversation.create({
      //       userId: userId,
      //       conversationId: conversationId,
      //     });

      //     search.push(userId);

      //     conversation.set({
      //       users: search.join(' '),
      //     });
      //     await conversation.save();
      //   }
        const message = await Message.create({ ...args.input });

        await pubsub.publish(MESSAGE_ADDED, { sendMessage: message });
        return message;
        
      } catch (error) {
        console.error('error with message', error);
      }
      
    },
  },
  Subscription: {
    messageSent: {
      subscribe: () => {
        return pubsub.asyncIterator([MESSAGE_ADDED]);
      },
    },
  },
};

module.exports = { resolvers };
