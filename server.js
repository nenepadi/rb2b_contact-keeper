const express = require('express');
const connect = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();

connect();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Contact Keeper API!' });
});

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
