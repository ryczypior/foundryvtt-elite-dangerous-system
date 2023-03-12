import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGEnhancement extends ItemSheetEDRPG {
  get template() {
    if (!game.user.isGM && this.actor.limited) return "systems/edrpg/templates/items/item-limited.html";
    return "systems/edrpg/templates/items/enhancements.html";
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.isGM = this.isGM === true;
    return sheetData;
  }

  get isGM(){
    return game.user.isGM;
  }
}
