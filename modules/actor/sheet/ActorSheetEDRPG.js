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
    const skills = duplicate(this.actor._source.system.skills);
    if(Object.keys(skills).length === 0){
      this.actor.update({ "system.skills": duplicate(EDRPG.skills) });
    }
    return template;
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.system = sheetData.data.system // project system data so that handlebars has the same name and value paths
    sheetData.items = sheetData.data.items;
    sheetData.meleeWeaponsTypes = EDRPG.meleeWeaponsTypes;
    sheetData.meleeHands = EDRPG.meleeHands;
    return sheetData;
  }

  async _onChangeStatusValue(event) {
    event.preventDefault();
    const status = duplicate(this.actor._source.system.status);
    status[event.currentTarget.attributes['data-stateid'].value].value = Number(event.target.value);
    return await this.actor.update({"system.status": status});
  }

  async _onChangeCapValue(event) {
    event.preventDefault();
    const skills = duplicate(this.actor._source.system.skills);
    const skillIndex = event.currentTarget.attributes['data-skill'].value;
    const skillSectionIndex = event.currentTarget.attributes['data-section'].value;
    if (isNaN(event.target.value)) {
      event.target.value = skills[skillSectionIndex].skills[skillIndex].maxCapModifier;
      return;
    }
    skills[skillSectionIndex].skills[skillIndex].maxCapModifier = Number(event.target.value);
    return await this.actor.update({"system.skills": skills});
  }

  async changeSkillValue(skill, value){
    return await this.actor.changeSkillValue(skill, value);
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
    const skillIndex = event.currentTarget.attributes['data-skill'].value;
    await this.actor.changeSkillValue(skillIndex, event.target.value);
    return this.render();
  }

  async _onClickChecked(event){
    event.preventDefault();
    const skills = duplicate(this.actor._source.system.skills);
    const skillIndex = event.currentTarget.attributes['data-skill'].value;
    const skillSectionIndex = event.currentTarget.attributes['data-section'].value;
    if(skills[skillSectionIndex].skills[skillIndex].isChecked === 1){
      skills[skillSectionIndex].skills[skillIndex].isChecked = 0;
    } else {
      skills[skillSectionIndex].skills[skillIndex].isChecked = 1;
    }
    return await this.actor.update({"system.skills": skills});
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
    const socialFactor = duplicate(this.actor._source.system.socialFactor);
    socialFactor.sfOther.value = parseInt(event.target.value, 10);
    await this.actor.update({"system.socialFactor": socialFactor});
    return await this.actor.calculateSocialFactor();
  }

  async _onSkillClick(event) {
    const skillId = event.target.getAttribute('data-skill');
    const skillSectionId = event.target.getAttribute('data-section');
    const skills = duplicate(this.actor._source.system.skills);
    const skill = skills[skillSectionId].skills[skillId];
    const data = {
      ...skill, ...{
        callback: async () => {
          if (skills[skillSectionId].skills[skillId].isChecked === 0) {
            skills[skillSectionId].skills[skillId].isChecked = 1;
            await this.actor.update({"system.skills": skills});
          }
        },
        difficulty: 9
      }
    }
    const roll = new EDRPGSkillTests(data, this.actor);
    const rollResult = await roll.prepareTest();
    return rollResult;
  }


  activateListeners(html) {
    super.activateListeners(html);
    html.find(".changeStatusValue").on('change', this._onChangeStatusValue.bind(this));
    html.find(".changeSkillValue").on('change', this._onChangeSkillValue.bind(this));
    html.find(".changeCapValue").on('change', this._onChangeCapValue.bind(this));
    html.find(".clickChecked").on('click', this._onClickChecked.bind(this));
    html.find(".clickRemoveItem").on('click', this._onClickRemoveItem.bind(this));
    html.find(".onChangeActiveDescription").on('click', this._onChangeActiveDescription.bind(this));
    html.find('.skill-roll').on('click', this._onSkillClick.bind(this));
    html.find(".systemSocialFactorSfOtherValue").on('change', this._onChangeSocialFactor.bind(this));
  }
}
