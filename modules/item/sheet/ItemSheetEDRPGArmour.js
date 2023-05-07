import ItemSheetEDRPG from "./ItemSheetEDRPG.js";

export default class ItemSheetEDRPGArmour extends ItemSheetEDRPG {
  get template() {
    if (!game.user.isGM && this.actor.limited) return "systems/edrpg/templates/items/item-limited.html";
    return "systems/edrpg/templates/items/armour.html";
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.isGM = this.isGM === true;
    return sheetData;
  }

  get isGM(){
    return game.user.isGM;
  }

  async _onDiscreetChange (event){
    const armour = duplicate(this.item._source.system.armour);
    armour.discreet.value = event.target.checked;
    return await this.item.update({"system.armour": armour});
  }

  async _onAbsorbToxicChange (event){
    const armour = duplicate(this.item._source.system.armour);
    armour.absorbToxic.value = event.target.checked;
    return await this.item.update({"system.armour": armour});
  }

  /*async _handleEnrichment(system) {
    let enrichment = super._handleEnrichment(system);
    enrichment["system.karma.effect.value"] = await TextEditor.enrichHTML(system.karma.effect.value, { async: true })
    enrichment["system.karma.prerequisite.value"] = await TextEditor.enrichHTML(system.karma.prerequisite.value, { async: true })
    return expandObject(enrichment);
  }*/


  activateListeners(html) {
    super.activateListeners(html);
    html.find('.discreet').change(this._onDiscreetChange.bind(this));
    html.find('.absorbToxic').change(this._onAbsorbToxicChange.bind(this));
  }
}
