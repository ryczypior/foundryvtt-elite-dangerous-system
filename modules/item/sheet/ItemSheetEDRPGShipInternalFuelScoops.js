import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalFuelScoops extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-fuel-scoop.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
