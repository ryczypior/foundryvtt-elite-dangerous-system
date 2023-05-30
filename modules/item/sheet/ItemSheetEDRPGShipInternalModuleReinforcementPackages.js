import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalModuleReinforcementPackages extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-module-reinforcement-package.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
