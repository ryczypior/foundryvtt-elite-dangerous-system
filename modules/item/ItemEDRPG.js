export default class ItemEDRPG extends Item {
  prepareData() {
    super.prepareData();
  }

  isWorn() {
    if(!this._source.system.worn){
      return false;
    }
    return this._source.system.worn.value;
  }

  get socialFactor(){
    if(!this._source.system.socialFactor || !this.isWorn()) {
      return 0;
    }
    return this._source.system.socialFactor.value
  }
}

