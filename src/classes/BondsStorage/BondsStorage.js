const { formattedDateTime } = require('../../utils/mapBondsToStorage');

class BondsStorage {
  constructor() {
    this.data = new WeakMap();
    this.lastUpdateTime = null;
  }

  set bondsData(bData) {
    if (bData) {
      this.data.set(this, bData);
      this.lastUpdateTime = formattedDateTime(new Date());
    }
  }

  get bondsData() {
    return this.data.get(this);
  }
}

module.exports = BondsStorage;
