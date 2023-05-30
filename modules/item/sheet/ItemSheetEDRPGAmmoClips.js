import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGAmmoClips extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/ammo-clips.html";
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
