const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/api/pay', (req, res) => {
    res.json({ status: 'Payment successful (mock)' });
});


app.listen(5001, () => console.log('Node payment server running on port 5001'));