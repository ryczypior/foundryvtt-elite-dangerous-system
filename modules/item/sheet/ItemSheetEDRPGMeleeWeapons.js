import ItemSheetEDRPG from "./ItemSheetEDRPG.js";
import EDRPG from "../../system/EDRPG";

export default class ItemSheetEDRPGMeleeWeapons extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/melee-weapons.html";
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
