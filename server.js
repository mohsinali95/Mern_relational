const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/Items');
const list = require('./routes/api/List');
const app = express();
const port = process.env.PORT || 5000;
//body pasrse middleware
app.use(bodyParser.json());
//Connecy to  Mongo
mongoose.connect(db)
    .then(() => console.log("Mongo Db Connceted.."))
    .catch(err => console.log("error in conncetion mongo db", err));
//USe Route
app.use('/api/items', items);
app.use('/api/List', list);
app.listen(port, () => console.log("server Start on Port ", port))