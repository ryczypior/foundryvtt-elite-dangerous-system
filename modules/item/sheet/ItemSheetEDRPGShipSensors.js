import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipSensors extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-sensors.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
