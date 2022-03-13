const express= require ("express");
const path =require('path');

const mysql =require("mysql");

const dotenv =require('dotenv');

dotenv.config({path:'./.env'})


const app = express();

//conect datbase
const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory =path.join(__dirname,'./public');
app.use(express.static(publicDirectory));


//parse url-encoded bodies (as sent by html forms ) or u grab the data from any forms 
app.use(express.urlencoded({extended:false}))
//parse json bodies (as sent by API cliets )
app.use(express.json());

//set handalbars
app.set('view engine','hbs');

db.connect ((error)=>{
if(error){
    console.log(error)
}else{
    console.log("Mysql connected.... ")
}
})

//define routes
app.use('/',require('./routes/pages'))
app.use('/auth',require('./routes/auth'));


app.listen(5000,()=> {
    console.log("server started on port 5000")
})