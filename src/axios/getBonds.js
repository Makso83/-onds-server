const axios = require('axios');
const { urls } = require('../constants');

const getBonds = async () => {
  try {
    const { data } = await axios(urls.OFZ_BONDS);
    return data;
  } catch (err) {
    return null;
  }
};

module.exports = getBonds;
