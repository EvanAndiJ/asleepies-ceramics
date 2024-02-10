require('dotenv').config({
  debug: false 
})
const express = require('express');
const cors = require('cors')

const path = require('path')
const bodyParser = require('body-parser')
const corsOptions = {
  origin: ["https://localhost:3001", 'https://asleepies-ceramics.herokuapp.com/ ']
};

const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')))

const db = require("./models");
db.sequelize.sync({alter: true})


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/shop.routes')(app);

app.get('*', (req, res) => {
  process.env.NODE_ENV === 'production'
    ? res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
    : res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'))
}); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));