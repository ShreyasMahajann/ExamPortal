const mongoose = require('mongoose');
const app = require('./app');

// IN CASE OF UNCAUGHT_EXCEPTION
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// INITIALIZING PATH TO .CONFIG FILE

const db_url='mongodb://localhost:27017/ccs_auth'
// GETTING DATABASE AND PASSWORD FROM .CONFIG FILE
// MAKING CONNECTION WITH THE DATABASE
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

//   STARTING SERVER
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


// IN CASE OF UNHANDLED REJECTION (PROBLEM WITH DATABASE CONNECTION)
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

