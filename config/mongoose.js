//require the library
const mongoose=require("mongoose");

//connect to he database

mongoose.connect("mongodb+srv://sarveshvyas:sudo%23linux%40202@matrix-xbssh.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true});

//acquire the connection(to check if it is successfull)
const db=mongoose.connection;

// if there is error then print error
db.on("error",console.error.bind(console,"Error connecting to database"));

//if it is up and working print success
db.once("open",function(){
    console.log("Successfully connected to database");
})

