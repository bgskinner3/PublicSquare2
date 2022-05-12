const {User} = require('../db/models/User')
const {Bounty} = require('../db/models/Bounty')
const { NewsSource } = require('../db/models/NewsSource');
const {BountyVote} = require('../db/models/BountyVote')

const { GraphQLUpload } = require('graphql-upload');
const { GraphQLScalarType, Kind } = require('graphql');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

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
      const id = args.id;
      const post = await Bounty.findByPk(id);
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
      console.log(args);
      const { userId } = args;
      const userVotes = await BountyVote.findAll({
        where: {
          userId: userId,
        },
      });
      return userVotes;
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
            expiresIn: '1h',
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
    createBounty: async (parent, args, context) => {
      try {
        const existingPost = await Bounty.findOne({
          where: {
            link: args.input.link,
          },
        });
        if (existingPost) {
          throw new Error('That post has already been made');
        }
        const post = await Bounty.create({ ...args.input });
        return post;
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
      
        const {
          userId,
          positiveVote,
          negativeVote,
          bountyId,
         
        } = args.input;
        const exisitngUserVote = await BountyVote.findOne({
          where: {
            userId: userId,
            bountyId: bountyId
          },
          raw: true,
        });

        if (exisitngUserVote) {
          throw new Error(' You have already voted on this');
        }
        const vote = await BountyVote.create({
          userId: userId,
          positiveVote: positiveVote || 0,
          negativeVote: negativeVote || 0,
          bountyId: bountyId
        });

        return vote;
    
      } catch (error) {
        console.error('vote did not go through', error)
      }
    }
  },
};

module.exports = { resolvers };