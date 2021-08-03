const Scheduler = require('../classes/Scheduler/Scheduler');
const dataStorage = require('../__data__/index');
const getBonds = require('../axios/getBonds');
const { intervals } = require('../constants');
const { mapBondsToStorage } = require('../utils/mapBondsToStorage');

const bondsWorker = () => {
  const bondsSchedule = new Scheduler(intervals.HOUR);

  bondsSchedule.addTask('bondsRequest', async () => {
    const bondsData = await getBonds();
    dataStorage.ofz.bondsData = mapBondsToStorage(bondsData);
  });

  bondsSchedule.startTasks();
};

module.exports = bondsWorker;
