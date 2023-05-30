import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGShipInternalPlanetaryVehicleHangars extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ship-internal-planetary-vehicle-hangars.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
