import EDRPG from "../../system/EDRPG";

export default class ItemSheetEDRPG extends ItemSheet {
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.tabs = [{navSelector: ".tabs", contentSelector: ".content", initial: "main"}]
    options.classes = mergeObject(options.classes, ['edrpgitemsheet']);
    options.height = 500;
    options.width = 900;
    return options;
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.system = sheetData.data.system // project system data so that handlebars has the same name and value paths
    sheetData.isGM = this.isGM === true;
    sheetData.skills = duplicate(EDRPG.skills);
    sheetData.enrichment = await this._handleEnrichment(sheetData.system);
    return sheetData;
  }

  get isGM(){
    return game.user.isGM;
  }

  async _handleEnrichment(system)
  {
    let enrichment = {}
    enrichment["system.details.description.value"] = await TextEditor.enrichHTML(system.details.description.value, { async: true });
    enrichment["system.details.gmdescription.value"] = await TextEditor.enrichHTML(system.details.gmdescription.value, { async: true });
    if(system.notes){
      enrichment["system.notes.value"] = await TextEditor.enrichHTML(system.notes.value, { async: true });
    }
    return expandObject(enrichment);
  }

  async _onDiscreetChange (event){
    const armour = duplicate(this.item._source.system.armour);
    armour.discreet.value = event.target.checked;
    return await this.item.update({"system.armour": armour});
  }

  async _onIsWearableChange (event){
    const wearable = duplicate(this.item._source.system.wearable);
    wearable.value = event.target.checked;
    return await this.item.update({"system.wearable": wearable});
  }

  async _onAbsorbToxicChange (event){
    const armour = duplicate(this.item._source.system.armour);
    armour.absorbToxic.value = event.target.checked;
    return await this.item.update({"system.armour": armour});
  }

  async _onEffectCreateClick(event) {
    console.log(this.item._source.system);
    let effects = duplicate(this.item._source.system.effects);
    if(!effects.value){
      effects.value = [];
    }
    const effect = duplicate(game.edrpg.ItemEffect);
    effects.value.push(effect);
    return await this.item.update({"system.effects": effects});
  }

  async _onEffectRemoveClick(event) {
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
    const effects = duplicate(this.item._source.system.effects);
    const index = event.target.getAttribute('data-idx');
    effects.value.splice(index, 1);
    return await this.item.update({"system.effects": effects});
  }

  async _onChangeEffect(event) {
    const effects = duplicate(this.item._source.system.effects);
    const index = event.target.getAttribute('data-idx');
    effects.value[index].skillId = event.target.value;
    return await this.item.update({"system.effects": effects});
  }

  async _onChangeEffectValue(event) {
    const effects = duplicate(this.item._source.system.effects);
    const index = event.target.getAttribute('data-idx');
    effects.value[index].skillValue = parseInt(event.target.value, 10) || 10;
    return await this.item.update({"system.effects": effects});
  }

  _onRemoveFromCharacter(actor){
    return null;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.discreet').on('change', this._onDiscreetChange.bind(this));
    html.find('.absorbToxic').on('change', this._onAbsorbToxicChange.bind(this));
    html.find('.isWearable').on('change', this._onIsWearableChange.bind(this));
    html.find('.effectCreate').on('click', this._onEffectCreateClick.bind(this));
    html.find('.effectRemove').on('click', this._onEffectRemoveClick.bind(this));
    html.find('.changeEffect').on('change', this._onChangeEffect.bind(this));
    html.find('.changeEffectValue').on('change', this._onChangeEffectValue.bind(this));
  }
}
