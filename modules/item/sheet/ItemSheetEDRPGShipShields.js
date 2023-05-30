import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipShields extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-shields.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
