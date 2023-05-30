import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipBulkheads extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-bulkheads.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
