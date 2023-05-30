import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalDockingComputer extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-docking-computer.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
