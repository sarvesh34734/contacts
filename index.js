const express=require("express");
const path=require("path");
// const port=8000;


const db=require("./config/mongoose");
const Contact=require("./models/contact")
const app=express();

app.set("view engine","ejs");   //sets propertry of view engine to be ejs
app.set("views",path.join(__dirname,"views"));  //set views to the folder views inside __dirname
app.use(express.urlencoded());
app.use(express.static("assets"));


// //middlewares next is used to call nexxt middleware
// app.use(function(req,res,next){

//     console.log("middleware1 is called");
//     next();
// })

// //middleware2
// app.use(function(req,res,next)
// {
//     console.log("middleware2 is called");
//     next();
// })

// setting up var named contactList
var contactList=[{
    name:"sarvesh",
    phone:"9929570617"
    },
    {
        name:"pratyush",
        phone:"9414740007"

    },
    {
        name:"home",
        phone:"8290206061"
    },
    {
        name:"mom",
        phone:"9166227060"
    }]


app.get("/",function(req,res){
    // console.log(__dirname);   //__dirname is where the server is placed

    // res.send("<h1>Yeah! this page is working</h1>");
    return res.render("home",{
        title:"Create Contact",
        
    });
})

// app.get("/profile",function(req,res){

//     // res.send("<h1>Someone accessed your profile</h1>")
//     return res.render("profile",{title:"sarvesh vyas"})
// })

app.get("/contact",function(req,res){


    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error fetching contacts from database");
        }

        return res.render("contact",{wall:"contact-list",
        contact_list:contacts,
    });
    })
})

app.post("/create-contact",function(req,res){

    // console.log(req.body);
    // console.log(req.body.name);
    //contacts will be stored in am on efresh it will disappear
    //we are not pushing to array nnymore rather we are pushing to database
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log("error creating database");
            return;    
        }
        console.log("******",newContact);
        
        return res.redirect("/contact");
    })
    // return res.redirect("/contact");
})

app.get("/delete-contact/:id",function(req,res){
    console.log(req.params);
    let id=req.params.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("cannot delete the contact");
        }
        return res.redirect("back");
        
    })
    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);

    // if(contactIndex!=-1)
    // {
    //     contactList.splice(contactIndex,1);
    // }
})

app.get("/home",function(req,res){
    
    return res.redirect("/");
})

app.get("/view-contacts",function(req,res){
    
    return res.redirect("/contact");
})




app.listen(port,function(err){

    if(err){console.log("There is an error running the server "+err)}
    
    console.log("Hola! The server is up and running on port "+port)

})
