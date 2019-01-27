const mongoose = require('mongoose');
const User = require('../models/user');

const dbName = 'awesome-sidecomments';
mongoose.connect(`mongodb://localhost/${dbName}`);

const users = [
  {
    id: 1,
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDW3D0Emu0_gpP-tAEGPjW88zSabvpdICv6BaoNLArqY3xB4NA",
    name: "Jesus Zuñiga Vega"
  },
]

User.create(users, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${users.length} users`)
  mongoose.connection.close()
});