const express = require("express");
const path = require("path");
const { title } = require("process");
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const app = express();
const port= 80;

// static folder access publically 

app.use('/static', express.static('static'));

// set template engine as pug in express 

app.set('view engine', 'pug');

// set the view directory

app.set('views', path.join(__dirname, 'views'));

// pug template

app.use(express.urlencoded());

app.get("/",(req,res)=>{

    const prams = {};

    res.status(200).render('home.pug',prams);

})

app.get("/contact",(req,res)=>{

    const prams = {};

    res.status(200).render('contact.pug',prams);

})

// post request 

app.post("/contact",(req,res)=>{

    var mydata = new contact(req.body);

    mydata.save().then(()=>{
        res.send("this information is stored in dbs");
    }).catch(()=>{
        res.status(400).send("the information is not stored in dbs");
    })

})

// database 

main().catch(err => console.log(err));

async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');

}

// schema 

const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,

});

//  model 

const contact = mongoose.model('contact', ContactSchema);

// port listen

app.listen(port,()=>{

    console.log(`the application stated successfully on port ${port}`);

})