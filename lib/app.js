const express = require('express');
const app = express();

app.use(express.json());
app.use('/actors', require('./routes/actor'));
app.use('/studios', require('./routes/studio'));
app.use('/reviewer', require('./routes/reviewer'));
app.use('/reviews', require('./routes/review'));
app.use('/films', require('./routes/film'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
