import ItemSheetEDRPG from "./ItemSheetEDRPG.js";
import EDRPG from "../../system/EDRPG.js";

export default class ItemSheetEDRPGSkills extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/skill.html";
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.skillsCategories = duplicate(EDRPG.skillsCategories);
    return sheetData;
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
