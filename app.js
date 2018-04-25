const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const app = express();
 
app.use(cors({
  exposedHeaders: "Content-Length, X-JSON",
  origin: 'https://akai-org.github.io/rozklad-ekrany/'
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/*", (req, res, next) => {
  if(req.body) {
    let formBody = [];
    for (const property in req.body) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(req.body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`https://www.peka.poznan.pl/vm${req.url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody
    }).then(data => data.json())
      .then(data => {
        res.send(JSON.stringify(data));
      })
      .catch(err => {
        console.warn(err);
        res.send(400);
      });
  }  
});

app.listen(3000, () => console.log('Amazing mega PEKA proxy listening on port 5678!'))
