import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGCybernetics extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/cybernetics.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
