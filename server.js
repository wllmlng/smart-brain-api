const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Wllm',
    password : '',
    database : 'smart-brain'
  }
});


const app = express();


app.use(bodyParser.json());
app.use(cors());


// START----------------SIGNIN & REGISTER------------------
app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// END----------------SIGNIN & REGISTER------------------

// START----------------PROFILE------------------
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

// END----------------PROFILE------------------

// START----------------PUT------------------
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

// END----------------PUT------------------



// START----------------BCRYPT------------------
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });
//
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(3000, ()=>{
  console.log('app is running on port 3000')
})


/*

/ --> res = this is working
/signin --> POST success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
