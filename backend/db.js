// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mohsintechbrainz1999:ABZJqEayh2e3Djop@mohsincluster.mic2m.mongodb.net/tap_royale?retryWrites=true&w=majority&appName=MohsinCluster');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
