import ItemSheetEDRPG from "./ItemSheetEDRPG.js";
import EDRPG from "../../system/EDRPG.js";

export default class ItemSheetEDRPGBackground extends ItemSheetEDRPG {
  get template() {
    if (!game.user.isGM && this.actor.limited) return "systems/edrpg/templates/items/item-limited.html";
    return "systems/edrpg/templates/items/backgrounds.html";
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.backgroundBonusTypes = EDRPG.backgroundBonusTypes;
    sheetData.skills = EDRPG.skills;
    sheetData.isGM = this.isGM === true;
    return sheetData;
  }

  get isGM(){
    return game.user.isGM;
  }

  async _handleEnrichment(system) {
    let enrichment = super._handleEnrichment(system);
    enrichment["system.backgrounds.bonuses.value"] = await TextEditor.enrichHTML(system.backgrounds.bonuses.value, { async: true })
    return expandObject(enrichment);
  }

  async _onBonusEffectCreateClick(event) {
    const effects = duplicate(this.item._source.system.effects);

  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.bonusEffectCreate').click(this._onBonusEffectCreateClick.bind(this));
  }
}
