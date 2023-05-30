import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipLifeSupport extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-life-support.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
