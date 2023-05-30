import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalFSDInterdictors extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-fsd-interdictor.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
