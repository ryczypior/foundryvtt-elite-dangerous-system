import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalShieldCellBanks extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-shield-cell-banks.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
