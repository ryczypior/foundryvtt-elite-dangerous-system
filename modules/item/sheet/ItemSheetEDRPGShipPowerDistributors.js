import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipPowerDistributors extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-power-distributors.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
