let mongoose = require('mongoose'),
  // db = process.env.MONGODB_URI;
  db =
    'mongodb+srv://test3:test3@cluster0-swphy.mongodb.net/test?retryWrites=true&w=majority';

console.log(db);
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log('Databased connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
