const intervals = {
  SECOND: 1000,
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000,
};

const urls = {
  OFZ_BONDS: 'http://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQOB/securities.json',
};

const messages = {
  errorEmptyData: 'К сожалению, заправшиваемые данные в настоящее время недоступны. Пожалуйста, попробуйте повторить позднее',
};

module.exports = {
  intervals,
  urls,
  messages,
};
