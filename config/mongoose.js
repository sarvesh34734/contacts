//require the library
const mongoose=require("mongoose");

//connect to he database
mongoose.connect("mongodb://localhost/contacts_list_db");

//acquire the connection(to check if it is successfull)
const db=mongoose.connection;

// if there is error then print error
db.on("error",console.error.bind(console,"Error connecting to database"));

//if it is up and working print success
db.once("open",function(){
    console.log("Successfully connected to database");
})

