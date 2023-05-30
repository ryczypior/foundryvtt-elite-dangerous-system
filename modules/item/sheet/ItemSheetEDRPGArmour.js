import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGArmour extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/armour.html";
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
