import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipCargoHatch extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-cargo-hatch.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
