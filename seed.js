const { db } = require('./server/db/index.js');
const { User } = require('./server/db/models/User');
require('dotenv').config();

async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log('db synced!');

    await User.create({
      id: 1,
      username: 'Admin',
      password: process.env.REACT_APP_ADMIN_PASSWORD,
      admin: true,
      wallet: 100000,
    });
  
  } catch (error) {
    console.error('syncing dummy data did not work', error);
  }
}

module.exports = seed;

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}
