const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/api/validate', async (req, res) => {
  const email = req.query.email;
  const options = {
    method: 'GET',
    url: 'https://mailcheck.p.rapidapi.com/',
    params: { email },
    headers: {
      'x-rapidapi-host': 'mailcheck.p.rapidapi.com',
      'x-rapidapi-key': '0e6df1cf43msha5f18bdb45e230bp1bf2ffjsn5f5a83f0573a',
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
