//Necessities
const express = require('express');
const app = express();
const myDb = require('./myDatabase');
require('dotenv').config({ path: __dirname + '/../.env' });
const CookieParser = require('cookie-parser');
const cors = require('cors')
const isLoggedIn = require('./Middlewares/loggedInCheckMiddleware');

//ROUTERS
const posts = require('./routes/postMenu');
const userGateway = require('./routes/userGateway');


//ENGINES AND REQUIREMENTS...
app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

// ROUTES ...
app.use('/blogspot/posts', posts);
app.use('/blogspot/users', userGateway);

app.listen(process.env.PORT, async ()=>{
    await myDb();
    console.log('Server running at', process.env.PORT);
})