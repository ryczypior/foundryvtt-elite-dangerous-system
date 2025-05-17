import EDRPG from "../../system/EDRPG";
import EDRPGSkillTests from "../../tests/EDRPGSkillTests";

export default class ActorSheetEDRPG extends ActorSheet {
  validItemTypes = [
  ];
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.tabs = [{navSelector: ".tabs", contentSelector: ".content", initial: "main"}];
    options.classes = mergeObject(options.classes, ['edrpgsheet']);
    options.width = 990;
    return options;
  }

  get template(){
    let template = super.template;
    return template;
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.system = sheetData.data.system // project system data so that handlebars has the same name and value paths
    sheetData.items = sheetData.data.items.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    sheetData.meleeWeaponsTypes = EDRPG.meleeWeaponsTypes;
    sheetData.meleeHands = EDRPG.meleeHands;
    sheetData.socialFactorCap = game.settings.get("edrpg", 'socialFactorCap');
    sheetData.skillsCategories = EDRPG.skillsCategories;
    sheetData.imperialRanks = EDRPG.imperialHonoraryRanks;
    sheetData.federationRanks = EDRPG.federationHonoraryRanks
    return sheetData;
  }

  async _onChangeStatusValue(event) {
    event.preventDefault();
    const status = duplicate(this.actor._source.system.status);
    status[event.currentTarget.attributes['data-stateid'].value].value = Number(event.target.value);
    console.log(status);
    return await this.actor.update({"system.status": status});
  }

  async _onChangeCapValue(event) {
    event.preventDefault();
    const item = this.actor.items.get(event.currentTarget.attributes['data-skill'].value);
    if (isNaN(event.target.value)) {
      event.target.value = 0
    }
    return await item.update({
      'system.skill.skillGenius.value': Number(event.target.value),
    });
  }

  /**
   * @param skillsToChange [{skillId, skillValue}]
   */
  async addSkillValue(skillsToChange){
    await this.actor.addSkillValue(skillsToChange);
    return this.render();
  }

  async _onChangeSkillValue(event) {
    event.preventDefault();
    const item = this.actor.items.get(event.currentTarget.attributes['data-skill'].value);
    await this.actor.changeSkillValue(item, event.target.value);
    return this.render();
  }

  async _onClickChecked(event){
    event.preventDefault();
    const item = this.actor.items.get(event.currentTarget.attributes['data-skill'].value);
    return await item.update({
      'system.skill.skillChecked.value': !item.system.skill.skillChecked.value,
    });
  }

  async _onRemoveSkill(event){
    event.preventDefault();
    const skillId = event.currentTarget.attributes['data-skill'].value;
    const sectionId = event.currentTarget.attributes['data-section'].value;

    await this.actor.removeSkill(skillId, sectionId);
    return this.render();
    return null;
  }

  async __wearItem(item){
    try {
      const worn = duplicate(item._source.system.worn);
      worn.value = true;
      await item.update({"system.worn": worn});
    } catch (e) {}
    await this.actor.calculateSocialFactor();
    return item;
  }

  async __unWearItem(item) {
    try {
      const worn = duplicate(item._source.system.worn);
      worn.value = false;
      await item.update({"system.worn": worn});
    } catch (e) {}
    await this.actor.calculateSocialFactor();
    return item;
  }

  async _onClickCheckedWorn(event){
    event.preventDefault();
    const id = event.currentTarget.attributes['data-id'].value;
    const item = this.actor.items.get(id);
    if(!item){
      ui.notifications.warn("Item not found");
      return null;
    }
    if(item._source.system.worn.value === false){
      await this.__wearItem(item);
    } else {
      await this.__unWearItem(item);
    }
    return null;
  }

  async _onClickCheckedEquipped(event){
    event.preventDefault();
    const id = event.currentTarget.attributes['data-id'].value;
    const item = this.actor.items.get(id);
    if(!item){
      ui.notifications.warn("Item not found");
      return null;
    }
    if(item._source.system.equipped.value === false){
      await this.__wearItem(item);
    } else {
      await this.__unWearItem(item);
    }
    return null;
  }

  async _onDropItem(event, data){
    const item = await fromUuid(data.uuid);
    if(this.validItemTypes.indexOf(item.type) === -1){
      ui.notifications.warn(game.i18n.localize('WARN.ItemCannotBeAdded'));
      return null;
    }

    const method = 'add'+item.type.charAt(0).toUpperCase()+item.type.slice(1);
    if(this.actor[method]){
      await this.actor[method](item);
    }
    return await super._onDropItem(event, data);
  }

  async _onRemoveItem(id){
    const item = this.actor.items.get(id);
    if(item){
      await this.__unWearItem(item);
      const method = 'remove'+item.type.charAt(0).toUpperCase()+item.type.slice(1);
      if(!this.actor[method]){
        return null;
      }
      return await this.actor[method](item);
    }
    return null;
  }

  _onClickRemoveItem(event){
    event.preventDefault();
    const id = event.currentTarget.attributes['data-id'].value;
    this._onRemoveItem(id);
    this.actor.deleteEmbeddedDocuments("Item", [id]);
  }

  _onChangeActiveDescription(event){
    event.preventDefault();
    const elements = event.currentTarget.closest('.tablerow').getElementsByClassName("tabledescripion");
    for(const x of elements){
      if(x.style.display === 'block'){
        x.style.display = 'none';
      } else {
        x.style.display = 'block';
      }
    }
  }

  async _onChangeSocialFactor(event){
    if(event && event.preventDefault){
      event.preventDefault();
    }
    if(isNaN(event.target.value)) {
      event.target.value = 0;
    }
    const socialFactor = duplicate(this.actor._source.system.socialFactor);
    socialFactor.sfOther.value = Number(event.target.value);
    await this.actor.update({"system.socialFactor": socialFactor});
    return await this.actor.calculateSocialFactor();
  }

  async _onSkillClick(event) {
    const item = this.actor.items.get(event.currentTarget.attributes['data-skill'].value);
    if(!item) {
      return null;
    }
    const data = {
      ...item, ...{
        callback: async () => {
          if (!item.system.skill.skillChecked.value) {
            await item.update({
              'system.skill.skillChecked.value': true,
            });
          }
        },
        difficulty: 9
      }
    }
    const roll = new EDRPGSkillTests(data, this.actor);
    const rollResult = await roll.prepareTest();
    return rollResult;
  }

  async _onChangeFederationRank(event){
    const honoraryRanks = duplicate(this.actor._source.system.honoraryRanks);
    honoraryRanks.federation.socialFactor = EDRPG.federationHonoraryRanks[event.target.value].socialFactor;
    honoraryRanks.federation.unlocks = EDRPG.federationHonoraryRanks[event.target.value].unlocks;
    await this.actor.update({"system.honoraryRanks": honoraryRanks});
    return await this.actor.calculateSocialFactor();
  }

  async _onChangeImperialRank(event){
    const honoraryRanks = duplicate(this.actor._source.system.honoraryRanks);
    honoraryRanks.imperial.socialFactor = EDRPG.imperialHonoraryRanks[event.target.value].socialFactor;
    honoraryRanks.imperial.unlocks = EDRPG.imperialHonoraryRanks[event.target.value].unlocks;
    await this.actor.update({"system.honoraryRanks": honoraryRanks});
    return await this.actor.calculateSocialFactor();
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".changeStatusValue").on('change', this._onChangeStatusValue.bind(this));
    html.find(".changeSkillValue").on('change', this._onChangeSkillValue.bind(this));
    html.find(".changeCapValue").on('change', this._onChangeCapValue.bind(this));
    html.find(".clickChecked").on('click', this._onClickChecked.bind(this));
//    html.find(".clickCheckedArmourWorn").on('click', this._onClickCheckedArmourWorn.bind(this));
    html.find(".clickRemoveItem").on('click', this._onClickRemoveItem.bind(this));
    html.find(".onChangeActiveDescription").on('click', this._onChangeActiveDescription.bind(this));
    html.find('.skill-roll').on('click', this._onSkillClick.bind(this));
    html.find(".systemSocialFactorSfOtherValue").on('change', this._onChangeSocialFactor.bind(this));
    html.find("[name='system.honoraryRanks.federation.value']").on('change', this._onChangeFederationRank.bind(this));
    html.find("[name='system.honoraryRanks.imperial.value']").on('change', this._onChangeImperialRank.bind(this));
    html.find(".clickCheckedWorn").on('click', this._onClickCheckedWorn.bind(this));
    html.find(".clickCheckedEquipped").on('click', this._onClickCheckedEquipped.bind(this));
  }
}
