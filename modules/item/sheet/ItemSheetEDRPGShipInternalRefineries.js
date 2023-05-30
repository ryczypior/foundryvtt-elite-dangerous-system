import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalRefineries extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-refineries.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
