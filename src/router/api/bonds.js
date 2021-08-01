const express = require('express');
const dataStore = require('../../__data__/index');
const { messages } = require('../../constants');

const bondsRouter = express.Router();

bondsRouter.get('/OFZ', (req, res) => {
  if (dataStore?.ofz?.bondsData?.length) {
    res.status(200).send(
      {
        success: true,
        data: dataStore.ofz.bondsData,
        lastUpdate: dataStore.ofz.lastUpdateTime,
      },
    );
  } else {
    res.status(200).send(
      {
        success: false,
        errorMessage: messages.errorEmptyData,
      },
    );
  }
});

module.exports = bondsRouter;
