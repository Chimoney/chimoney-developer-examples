const express = require('express')
const ChimoneyControlller = require('./src/controller/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoute = require('./src/routes/index');

const port = 3000;
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



router.post('/webhook', ChimoneyControlller.recieveWebhook);


app.use('/api', apiRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})