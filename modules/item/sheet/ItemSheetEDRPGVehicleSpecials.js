import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGVehicleSpecials extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/vehicle-specials.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
