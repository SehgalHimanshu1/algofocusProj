const mongoose = require('mongoose');
let  dbURI = 'mongodb://127.0.0.1:27017/formData';

if (process.env.NODE_ENV === 'production'){
  dbURI = process.env.MONGODB_URI;
}

/* mongoose conn events */
mongoose.connect(dbURI, {useNewUrlParser: true})

mongoose.connection.on('connected', () => {
  console.log('mongoose connected to ', dbURI);
});
mongoose.connection.on('error', error => {
  console.log('mongoose connection error: ', error);
});
mongoose.connection.on('disconnected', ()=>{
  console.log('mongoose disconnected');
});

/* to catch SIGINT termina signal on win32 platf */
if(process.platform === 'win32'){
  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', ()=>{
    process.emit('SIGINT');
  });
}

const gracefulShutdown = function (msg, callback){
  mongoose.connection.close(function(){
    console.log(`mongoose disconnected through ${msg}`);
    callback();
  });
};

/* to properpy close the database connection */
process.once('SIGUSR2', ()=>{
  gracefulShutdown('nodemon restart', ()=>{
    process.kill(process.pid, 'SIGUSR2');
  });
});

/*app termina sig */
process.on('SIGINT', ()=>{
  gracefulShutdown('app termination', ()=>{
    process.exit(0);
  });
});

/* hreoku app termina */
process.on ('SIGTERM', ()=>{
  gracefullShutdown('heroku app shutdown', ()=>{
    process.exit(0);
  });
});
const userDataSchema = require("./userData");
/* exposing so that controller func can save data */
global.detailsModel = mongoose.model("Details", userDataSchema);
