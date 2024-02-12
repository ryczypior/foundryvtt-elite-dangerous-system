import ItemSheetEDRPG from "./ItemSheetEDRPG.js";
import EDRPG from "../../system/EDRPG.js";
import EDRPGUtils from "../../system/EDRPGUtils";

export default class ItemSheetEDRPGBackground extends ItemSheetEDRPG {
  get template() {
    return "systems/edrpg/templates/items/backgrounds.html";
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.backgroundBonusTypes = duplicate(EDRPG.backgroundBonusTypes);
    sheetData.skills = duplicate(EDRPG.skills);
    //sheetData.enhancements = EDRPGUtils.findItemsByType('Enhancements');
    return sheetData;
  }

  async _handleEnrichment(system) {
    let enrichment = super._handleEnrichment(system);
    enrichment["system.backgrounds.bonuses.value"] = await TextEditor.enrichHTML(system.backgrounds.bonuses.value, { async: true })
    return expandObject(enrichment);
  }

  async _onBonusEffectCreateClick(event) {
    let effects = duplicate(this.item._source.system.backgrounds.effects);
    if(!effects){
      effects = [];
    }
    const effect = duplicate(game.edrpg.BackgroundEffect);
    effects.push(effect);
    return await this.item.update({"system.backgrounds.effects": effects});
  }

  async _onBonusEffectRemoveClick(event) {
    if(event){
      if(event.stopPropagation){
        event.stopPropagation()
      }
      if(event.stopImmediatePropagation){
        event.stopImmediatePropagation();
      }
      if(event.preventDefault){
        event.preventDefault();
      }
    }
    const effects = duplicate(this.item._source.system.backgrounds.effects);
    const index = event.target.getAttribute('data-idx');
    effects.splice(index, 1);
    return await this.item.update({"system.backgrounds.effects": effects});
  }

  async _onChangeEffectType(event) {
    const effects = duplicate(this.item._source.system.backgrounds.effects);
    const index = event.target.getAttribute('data-idx');
    effects[index].type = event.target.value;
    return await this.item.update({"system.backgrounds.effects": effects});
  }

  async _onChangeEffectSkillType(event) {
    const effects = duplicate(this.item._source.system.backgrounds.effects);
    const index = event.target.getAttribute('data-idx');
    effects[index].skillSelect = event.target.value;
    return await this.item.update({"system.backgrounds.effects": effects});
  }

  async _onChangeEffectSkill(event) {
    const effects = duplicate(this.item._source.system.backgrounds.effects);
    const index = event.target.getAttribute('data-idx');
    effects[index].skillId = event.target.value;
    return await this.item.update({"system.backgrounds.effects": effects});
  }

  async _onChangeEffectSkillValue(event) {
    const effects = duplicate(this.item._source.system.backgrounds.effects);
    const index = event.target.getAttribute('data-idx');
    effects[index].skillValue = parseInt(event.target.value, 10) || 10;
    return await this.item.update({"system.backgrounds.effects": effects});
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.bonusEffectCreate').click(this._onBonusEffectCreateClick.bind(this));
    html.find('.bonusEffectRemove').click(this._onBonusEffectRemoveClick.bind(this));
    html.find('.changeEffectType').change(this._onChangeEffectType.bind(this));
    html.find('.changeEffectSkillType').change(this._onChangeEffectSkillType.bind(this));
    html.find('.changeEffectSkill').change(this._onChangeEffectSkill.bind(this));
    html.find('.changeEffectSkillValue').change(this._onChangeEffectSkillValue.bind(this));
  }
}
