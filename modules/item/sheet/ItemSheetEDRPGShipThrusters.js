import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipThrusters extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-thrusters.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
