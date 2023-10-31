// const bcrypt = require('bcrypt');
// const { log } = require('console');

// const hashPassword = async() => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// }

// const login = async(pw, hashedPw) => {
//     const result = await bcrypt.compare(pw, hashedPw);
//     if(result){
//         console.log("Logged in")
//     } else {
//         console.log("Incorrect")
//     }
// }

// // hashPassword('monkey');
// login('monkey', 'monkey')

const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function main() {
    await mongoose.connect("mongodb://localhost:27017/authDemo", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    // res.render('register')
    res.send('This is the home page')
});

app.post('/register', async (req, res) => {
    // res.send(req.body)
    const {password, username} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    // res.send(hash);
    res.redirect('/');
});

app.get('/secret', (req, res) => {
    res.send('This is secret! You cannot see me unless you are logged in')
});

app.listen(3000, () => {
    console.log("Server started on port 3000")
});