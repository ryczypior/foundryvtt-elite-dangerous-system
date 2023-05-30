import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalHBLimpetControllers extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-hb-limpet-controller.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
