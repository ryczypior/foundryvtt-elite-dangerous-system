import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGVehicleShields extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/vehicle-shields.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
