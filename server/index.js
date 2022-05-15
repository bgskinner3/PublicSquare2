
// const { ApolloServer } =require('apollo-server-express')
// const { createServer } = require('http')
// const { db } = require('./db');
// const { resolvers } = require('./resolvers');
// const { typeDefs } = require('./type-defs');
// const express = require('express');
// const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
// const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { WebSocketServer } = require('ws');
// const { useServer } = require('graphql-ws/lib/use/ws');
// const getUser = require('./db/controllers/getUser');
// require('dotenv').config();



// // const { graphqlUploadExpress } = require('graphql-upload');
// // const cors = require('cors');
// // const getUser = require('./db/controllers/getUser');
// // const http = require('http');
// // const path = require('path');


// // Create the schema, which will be used separately by ApolloServer and
// // the WebSocket server.
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// // Create an Express app and HTTP server; we will attach both the WebSocket
// // server and the ApolloServer to this HTTP server.
// const app = express();
// const httpServer = createServer(app);

// // Create our WebSocket server using the HTTP server we just set up.
// const wsServer = new WebSocketServer({
//   server: httpServer,
//   path: '/graphql',
// });

// const StartServer = async () => {
//   const serverCleanup = useServer({ schema }, wsServer);

//   // Set up ApolloServer.
//   const server = new ApolloServer({
//     schema,
//     csrfPrevention: true,
//     plugins: [
//       // Proper shutdown for the HTTP server.
//       ApolloServerPluginDrainHttpServer({ httpServer }),

//       // Proper shutdown for the WebSocket server.
//       {
//         async serverWillStart() {
//           return {
//             async drainServer() {
//               await serverCleanup.dispose();
//             },
//           };
//         },
//       },
//     ],
//   });

//   await server.start();
//   server.applyMiddleware({ app });

//   const PORT = 4000;
//   // Now that our HTTP server is fully set up, we can listen to it.
//   httpServer.listen(PORT, () => {
//     console.log(
//       `Server is now running on http://localhost:${PORT}${server.graphqlPath}`
//     );
//   });

// }
// // Save the returned server's info so we can shutdown this server later


// StartServer()




//this one  save

// const { ApolloServer } = require('apollo-server-express');
// const { resolvers } = require('./resolvers');
// const { typeDefs } = require('./type-defs');
// const { db } = require('./db');
// const express = require('express');
// const { graphqlUploadExpress } = require('graphql-upload');
// const cors = require('cors');
// const getUser = require('./db/controllers/getUser');
// const http = require('http');
// const path = require('path');
// const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
// const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { WebSocketServer } = require('ws');
// const { useServer } = require('graphql-ws/lib/use/ws');
// require('dotenv').config();

// const errorHandler = (err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }
//   const { status } = err;
//   res.status(status).json(err);
// };
// const schema = makeExecutableSchema({ typeDefs, resolvers });
// const app = express();

// const httpServer = http.createServer(app);
// // Create our WebSocket server using the HTTP server we just set up.
// // const wsServer = new WebSocketServer({
// //   server: httpServer,
// //   path: 'ws://localhost:4000/graphql',
// // });

// const StartServer = async () => {
//   await db.sync();
//   // const app = express();

//   // const httpServer = http.createServer(app);
//   // const serverCleanup = useServer({ schema }, wsServer);
//   const server = new ApolloServer({
//     schema,
//     context: async ({ req }) => {
//       const token = req.get('Authorization') || '';
//       if (token && token.length) {
//         const user = await getUser(token.replace('Bearer ', ''));

//         return { user };
//       } else {
//         return {};
//       }
//     },
//     plugins: [
//       ApolloServerPluginDrainHttpServer({ httpServer }),
//       //Proper shutdown for the WebSocket server.
//       // {
//       //   async serverWillStart() {
//       //     return {
//       //       async drainServer() {
//       //         await serverCleanup.dispose();
//       //       },
//       //     };
//       //   },
//       // },
//     ],
//     // subscriptions: { path: 'ws://localhost:4000/graphql' },
//   });

//   await server.start();

//   app.use(graphqlUploadExpress());
//     //app.use( cors());
//   app.use('*', cors());
//   // app.use(express.static(path.join(__dirname, '../build')));
//   // app.get('/*', (req, res) => {
//   //   res.sendFile(path.join(__dirname, '../build/index.html'));
//   // });
//   app.use(errorHandler);
//  server.applyMiddleware({ path: '/graphql', app });
//  //server.applyMiddleware({ app });
//   await new Promise((resolve) =>
//     httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
//   );
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// };

// StartServer();



























const { ApolloServer } = require('apollo-server-express');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./type-defs');
const { db } = require('./db');
const express = require('express');
const { graphqlUploadExpress } = require('graphql-upload');
const cors = require('cors');
const getUser = require('./db/controllers/getUser');
const http = require('http');
const path = require('path');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

require('dotenv').config();

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  res.status(status).json(err);
};

const startServer = async () => {
  await db.sync();
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.get('Authorization') || '';
      if (token && token.length) {
        const user = await getUser(token.replace('Bearer ', ''));

        return { user };
      } else {
        return {};
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(graphqlUploadExpress());
  app.use('*', cors());

  // app.use(express.static(path.join(__dirname, '../build')));
  // app.get('/*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../build/index.html'));
  // });
  app.use(errorHandler);
  server.applyMiddleware({ path: '/graphql', app });

  await new Promise((resolve) =>
    app.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startServer();
