const express = require('express');
const bondsRouter = require('./api/bonds');
const { notFoundController } = require('../controllers');

const router = express.Router();

router.use('/api/bonds', bondsRouter);
router.use(notFoundController);

module.exports = router;
