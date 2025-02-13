const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let users = [];

app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    users.push({ name, email, age }); 
    res.status(201).json({ message: 'User added successfully' });
});

app.get('/users', async (req, res) => {
    let filteredUsers = users.filter(user => user.age > 18);
    res.json(filteredUsers);
});

app.get('/users/:id', (req, res) => {
    const user = users[req.params.id]; 
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    users.splice(req.params.id, 1);
    res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
