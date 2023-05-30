import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipPowerPlants extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-power-plant.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
