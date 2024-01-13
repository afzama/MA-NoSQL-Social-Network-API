const connection = require('../config/connection');
const { user, thought } = require('../models');
const { getRandomThought, getRandomUserName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }

// Create empty array to hold the userNames
  const userNames = [];

// Loop 20 times -- add users to the users array
for (let i = 0; i < 20; i++) {
    // Get some random thought objects using a helper function that we imported from ./data
    const thought = getRandomThought(20);

    const user = getRandomUserName();

    user.push({
      userName,
      email,
      thought,
      friends,
      reaction,
    });
  }

// Add users to the collection and await the results
const userData = await userNames.insertMany(userName);

// Add thoughts to the collection and await the results
 await thought.create({
    thoughtText: 'Does it exist if we cannot see it?',
    users: [...userData.map(({_id}) => _id)],
  });

// Log out the seed data to indicate what should appear in the database
  console.table(user);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
