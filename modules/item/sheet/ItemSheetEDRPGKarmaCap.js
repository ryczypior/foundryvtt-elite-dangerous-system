import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGKarmaCap extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/karma-capabilities.html";
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
