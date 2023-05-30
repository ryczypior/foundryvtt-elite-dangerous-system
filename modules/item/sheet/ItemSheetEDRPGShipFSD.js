import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipFSD extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-fsd.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
