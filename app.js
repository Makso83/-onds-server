const express = require('express');
const helmet = require('helmet');
const router = require('./src/router');
const workers = require('./src/workers/index');

const server = express();
server.use(helmet());
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});
server.use('/', router);

// start all workers
Object.keys(workers).forEach((worker) => workers[worker]());

server.listen(5000);
