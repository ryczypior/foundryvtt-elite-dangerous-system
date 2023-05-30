import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalHullReinforcementPackages extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-hull-reinforcement-package.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
