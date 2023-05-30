import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGCommodities extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/commodities.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
