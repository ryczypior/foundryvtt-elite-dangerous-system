import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalShieldGenerators extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-shield-generators.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
