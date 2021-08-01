class BondsStorage {
  constructor() {
    this.data = new WeakMap();
    this.lastUpdateTime = null;
  }

  set bondsData(bData) {
    if (bData) {
      this.data.set(this, bData);
      this.lastUpdateTime = Date.now();
    }
  }

  get bondsData() {
    return this.data.get(this);
  }
}

module.exports = BondsStorage;
