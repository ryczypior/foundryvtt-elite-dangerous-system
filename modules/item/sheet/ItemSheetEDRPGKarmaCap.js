import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGKarmaCap extends ItemSheetEDRPG {
  get template() {
    if (!game.user.isGM && this.actor.limited) return "systems/edrpg/templates/items/item-limited.html";
    return "systems/edrpg/templates/items/karma-capabilities.html";
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.isGM = this.isGM === true;
    return sheetData;
  }

  get isGM(){
    return game.user.isGM;
  }

  async _handleEnrichment(system) {
    let enrichment = super._handleEnrichment(system);
    enrichment["system.karma.effect.value"] = await TextEditor.enrichHTML(system.karma.effect.value, { async: true })
    enrichment["system.karma.prerequisite.value"] = await TextEditor.enrichHTML(system.karma.prerequisite.value, { async: true })
    return expandObject(enrichment);
  }


  activateListeners(html) {
    super.activateListeners(html);
  }
}
