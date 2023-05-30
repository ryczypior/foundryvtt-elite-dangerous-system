import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGRangedWeapons extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ranged-weapons.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
