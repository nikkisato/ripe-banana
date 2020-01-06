const express = require('express');
const app = express();

app.use(express.json());

app.use('/studio', require('./routes/studio'));
app.use('/actors', require('./routes/actor'));
app.use('/reviewer', require('./routes/reviewer'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
