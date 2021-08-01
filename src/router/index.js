const express = require('express');
const bondsRouter = require('./api/bonds');

const router = express.Router();

router.use('/api/bonds', bondsRouter);
router.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

module.exports = router;
