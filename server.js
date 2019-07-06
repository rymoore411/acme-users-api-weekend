const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const {User, Department} = db.models;
app.use(express.json());
app.use(require('cors')());

db.syncAndSeed();

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening ${port}`));

app.get('/api/users', async(req, res, next)=> {
  try{
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

