//import dependencies

const express=require("express");
const cors=require("cors");
const mysql=require("mysql");
const bodyParser=require("body-parser");
const helmet=require("helmet");
const passport=require("passport");

/*const createapi=require("./Routes/createapi");*/

const events=require("./routes/events");
const users=require("./routes/users");

const app=express();

//configuring middleware

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
/*app.use("/create", createapi);*/


// connect to MySql database

const con=mysql.createConnection({
	host:"localhost",
	user:"root",
	database:"hobbies"
});

con.connect(err=>{
	if(err){return err};
});


//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport,con);

//Use routes
app.use("/events", events(con));
app.use("/users", users(con));

//Try-out
app.get("/", (req,res)=>{
	res.send("Haliho")
});

//setting-up port 

const port=process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server running on port ${port}`));	

