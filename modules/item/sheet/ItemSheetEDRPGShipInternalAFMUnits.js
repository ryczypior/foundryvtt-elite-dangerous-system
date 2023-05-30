import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalAFMUnits extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-afm-units.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
