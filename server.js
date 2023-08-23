const express = require("express");
const dotenv = require("dotenv");
const morgan = require(`morgan`);
const bodyparser = require("body-parser");
const path = require("path")
const session = require("express-session")
const cookiesParser = require("cookie-parser")

const connectDB = require("./server/database/connection")

const app = express();

dotenv.config({path:"config.env"}); // Corrected dotenv.config()

const PORT = process.env.PORT || 8081

app.use(cookiesParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }
  }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});
  
//log requests
app.use(morgan(`tiny`));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs") 

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//loard router
app.use('/',require('./server/routes/router'))

app.listen(PORT, () => { // Use PORT variable
    console.log(`Server is running on http://localhost:${PORT}`)
});
