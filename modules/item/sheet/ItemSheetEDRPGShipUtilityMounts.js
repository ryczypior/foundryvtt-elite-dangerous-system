import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipUtilityMounts extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-utility-mounts.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
