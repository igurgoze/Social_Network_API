const connection = require('../config/connections');
const { User, Thought } = require('../models');
const  { getUsers, getThoughts }  = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const userThoughts = []; // create array to be pushed into
    const users = getUsers();
    const thoughts = getThoughts();

    
    for (let i=0; i<=3; i++) {
        const newThought = await Thought.create({
            ...thoughts[i],
            username: users[i].username
        });

        userThoughts.push({
            ...users[i],
            thoughts: [newThought._id]
        })
    }
    await User.insertMany(userThoughts);
    console.table(userThoughts);

    console.info(`Database Seeded!`);
    process.exit();
})