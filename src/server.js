'use strict';

const express = require('express');
const app = express();
app.use(express.json());

const notFoundHandler = require('./errors-handler/404');
const internalServerError = require('./errors-handler/500');

app.get('/' , (req,res)=>{
    res.status(200).send('Every Thing Is Working Good... :)');
})

app.use('*' , notFoundHandler);
app.use(internalServerError);



module.exports = {
    server: app,
    start: port => {
      if (!port) { throw new Error('Missing Port'); }
      app.listen(port, () => console.log(`Listening on ${port}`));
    },
  };
