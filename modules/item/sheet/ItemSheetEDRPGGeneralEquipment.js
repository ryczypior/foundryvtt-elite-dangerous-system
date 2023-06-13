import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGGeneralEquipment extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/general-equipment.html";
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
