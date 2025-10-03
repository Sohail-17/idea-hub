const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));

const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.static("frontend"));

function readData() {
    if (!fs.existsSync(DATA_FILE)) return{ users:[], ideas:[] };
    return
    JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.post('/signup', (req, res) =>//endpoint for signup.html
{
    const { username, email } = req.body;
    if(!username || !email ) {
        return res.status(400).send('Username, Email are required');
    }
    console.log('Signup attempt:', username, email);
    res.send(`Signed up as ${username} for phase 1 dummy`);

});

app.post('/login', (req, res) =>//endpoint for login.html
{
    const { email } = req.body;
    if(!email) {
        return res.status(400).send('Email is required');
    }
   console.log('Login attempt with email:', email);
   res.send(`Login successful with ${email} for phase 1 dummy`);
});

app.post('/submit', (req, res)  =>//endpoint for sumbit.html
{
    const { userId, title, content } = req.body;
    if(!title || !content) {
        res.status(400).send('Title and Content ae required');
    }
    console.log('Idea submitted:',{ userId, title, content });
    res.send(`Idea submitted for phase 1 dummy through  userId:${userId}`);
});

app.listen(PORT, () => {
    console.log(`Phase 1 server running at http://localhost:${PORT}`);
});
