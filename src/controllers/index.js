const dataStore = require('../__data__');
const { messages } = require('../constants');

const notFoundController = (req, res) => {
  res.status(404).send("Sorry can't find that!");
};

const getBondsController = (req, res) => {
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
};

exports.notFoundController = notFoundController;
exports.getBondsController = getBondsController;
