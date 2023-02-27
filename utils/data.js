const {Types} = require('mongoose')

const names = [
  'Ian Gurgoze', // [0]
  'Chris Simmonds', // [1]
  'Leo Segura', // [2]
  'Josh Minor', // [3]
]


const usernames = [
  'igurgoze', // [0]
  'csimmonds', // [1]
  'lsegura', // [2]
  'jminor', // [3]
]


const email = [
  'igurgoze@email.com', // [0]
  'chris@email.com', // [1]
  'leo@email.com', // [2]
  'josh@email.com', // [3]
]


const thoughts = [
  `I love league of legends`, // [0]
  `My gf and i are going to dinner`, // [1]
  `Got work tonight again, what a drag`, // [2]
  `I love Zelda, check out this poster`, // [3]
]


const reactions = [
  {reactionId: new Types.ObjectId(), username:'igurgoze', reactionBody: `lets play sometime`}, // [0]
  {reactionId: new Types.ObjectId(), username:'csimmonds', reactionBody: `have fun man`}, // [1]
  {reactionId: new Types.ObjectId(), username:'lsegura', reactionBody: `work is never fun`}, // [2]
  {reactionId: new Types.ObjectId(), username:'jminor', reactionBody: `wow it's very cool`}, // [3]
]


// Function to get all users
function getUsers() {
return names.map((name, index) => ({
    name,
    username: usernames[index],
    email: email[index],
}));
}

// Function to get all thoughts
function getThoughts() {
return thoughts.map((thought, index) => ({
    thought,
    reactions: reactions[index],
}));
}

module.exports = {
getUsers,
getThoughts,
}