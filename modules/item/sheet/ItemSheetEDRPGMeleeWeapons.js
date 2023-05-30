import ItemSheetEDRPG from "./ItemSheetEDRPG.js";
import EDRPG from "../../system/EDRPG";

export default class ItemSheetEDRPGMeleeWeapons extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/melee-weapons.html";
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.meleeWeaponsTypes = duplicate(EDRPG.meleeWeaponsTypes);
    sheetData.meleeHands = duplicate(EDRPG.meleeHands);
    return sheetData;
  }



  activateListeners(html) {
    super.activateListeners(html);
  }
}
