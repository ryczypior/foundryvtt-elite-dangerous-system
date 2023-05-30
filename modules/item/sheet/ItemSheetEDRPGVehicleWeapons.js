import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGVehicleWeapons extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/vehicle-weapons.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
