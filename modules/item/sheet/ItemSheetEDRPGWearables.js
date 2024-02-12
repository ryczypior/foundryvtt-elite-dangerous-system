import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGWearables extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/wearables.html";
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
