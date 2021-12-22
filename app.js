// imports
const Joi = require('joi');
const express = require('express');
const { validate } = require('joi/lib/types/lazy');
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
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  
  const crypto = {
    id: cryptocurrencies.length + 1,
    name: req.body.name,
  };
  cryptocurrencies.push(crypto);
  res.send(crypto);
});

app.put('/api/cryptocurrencies/:id', (req, res) => {
  // Look up the cryptocurrencies
  const crypto = cryptocurrencies.find(c => c.id === parseInt(req.params.id));
  if (!crypto)
    res.status(404).send('The crypto with the given ID was not found.');
  // res.send(crypto);
  // If it not exist, return 404

  // const result = validateCrypto(req.body);
  const { error } = validateCrypto(req.body); // result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  // Update crypto
  crypto.name = req.body.name;
  // Return the updated crypto
  res.send(crypto);
});

const validateCrypto = crypto => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(crypto, schema);

  return Joi.validate(course, schema);
};

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
