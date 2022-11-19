const express = require('express');
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true })); // New

app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

const routes = require('./server/routes/user');
const { response } = require('express');
app.use('/', routes);


// Mail Chimp API Route
app.post('/subscribe', (req, res) => {
  const { email, name, address, zip, city, state, phone, chkvolunte, chkemailupdate, chkknockdoor, chkphonecalls, chkhelpmailing, chkhostparty, chkintern, chkyardsign } = req.body;
  console.log(req.body);
  const mcData= {
    members: [
      {
        email_address: email,
        status: 'pending',
        merge_fields: {
          FNAME: name,
          ADDRESS: address,
          ZIP: zip, 
          CITY: city,
          STATE: state,
          PHONE: phone,
          CHKVOLUNTE: chkvolunte,
          CHKEMAILUP: chkemailupdate,
          CHKKNOCKDO: chkknockdoor,
          CHKPHONECA: chkphonecalls,
          CHKHELPMAI: chkhelpmailing,
          CHKHOSTPAR: chkhostparty,
          CHKINTERN: chkintern,
          CHKYARDSIG: chkyardsign
        }
      }
    ]
  }

  const mcDataPost = JSON.stringify(mcData);

  const options = {
    url: 'https://us21.api.mailchimp.com/3.0/lists/d250887884',
    method: 'POST',
    headers: {
      Authorization: 'auth c582959a8bf13aa0c7f98c63c5fa5e65-us21'
    },
    body: mcDataPost
  }

  if (email) {
    request(options, (err, response, body) => {
      if (err) {
        res.json({error: err})
      } else {
        res.sendStatus(200);
      }
    })
  } else {
    res.status(404).send({message: 'Failed'})
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));