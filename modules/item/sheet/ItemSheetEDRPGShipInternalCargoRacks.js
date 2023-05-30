import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalCargoRacks extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-cargo-racks.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
