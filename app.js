// imports
const express = require('express');
const app = express();

// json middleware
app.use(express.json());

// cryptocurrencies object
const cryptocurrencies = [
  {
    id: 1,
    name: 'Bitcoin',
  },
  {
    id: 2,
    name: 'Ethereum',
  },
  {
    id: 3,
    name: 'L33thcoin',
  },
];

// GET request for the home/root page
app.get('/', (req, res) => {
  res.send('Hello, World !');
});

// GET request for all cryptocurrencies
app.get('/api/cryptocurrencies', (req, res) => {
  res.send(cryptocurrencies);
});

// POST request for all the cryptocurrencies testing endpoints to get cryptocurrencies
app.post('/api/cryptocurrencies', (req, res) => {
  // Input Validation
  if (!req.body.name || req.body.length < 3) {
    // 400 Bad Request
    res.status(400).send('Name is required and should have a minimum of 3 characters.');
    return;
  }
  const crypto = {
    id: cryptocurrencies.length + 1,
    name: req.body.name,
  };
  cryptocurrencies.push(crypto);
  res.send(crypto);
});

// GET request to get cryptocurrencies by id
app.get('/api/cryptocurrencies/:id', (req, res) => {
  const crypto = cryptocurrencies.find(c => c.id === parseInt(req.params.id));
  if (!crypto)
    res.status(404).send('The crypto with the given ID was not found.');
  res.send(crypto);
});

// GET request for the year and month
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
