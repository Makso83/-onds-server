const express = require('express');
const helmet = require('helmet');
const router = require('./src/router');
const workers = require('./src/workers/index');

const server = express();
server.use(helmet());
server.use('/', router);

// start all workers
Object.keys(workers).forEach((worker) => workers[worker]());

server.listen(5000);
