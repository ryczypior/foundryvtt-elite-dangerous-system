import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipWeapons extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-weapons.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
