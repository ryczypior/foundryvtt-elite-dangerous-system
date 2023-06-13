import ItemSheetEDRPG from "./ItemSheetEDRPG.js";
import EDRPG from "../../system/EDRPG";
import EDRPGUtils from "../../system/EDRPGUtils";

export default class ItemSheetEDRPGRangedWeapons extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ranged-weapons.html";
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
