const express = require('express');
const controllers = require('../../controllers');

const bondsRouter = express.Router();

bondsRouter.get('/OFZ', controllers.getBondsController);

module.exports = bondsRouter;
