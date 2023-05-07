import EDRPG from "../../system/EDRPG";

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
    console.log(sheetData.items);
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
    const skills = duplicate(this.actor._source.system.skills);
    value = Number(value);
    for(let skillSectionId in skills){
      for(let skillId in skills[skillSectionId].skills){
        if(skillId === skill){
          let maxCap = skills[skillSectionId].skills[skillId].maxCapModifier + this.actor._source.system.status.rank.value.skillCap;
          /* maximum cap cannot be more than 100 */
          if(maxCap > 100){
            maxCap = 100;
          }
          if (value > maxCap) {
            value = maxCap;
          }
          if(value < 10){
            value = 10;
          }
          skills[skillSectionId].skills[skillId].value = value;
          skills[skillSectionId].skills[skillId].bonus = Math.floor(skills[skillSectionId].skills[skillId].value / 10);
        }
      }
    }
    return await this.actor.update({"system.skills": skills});
  }
  async addSkillValue(skill, valueToAdd){
    const skills = duplicate(this.actor._source.system.skills);
    valueToAdd = Number(valueToAdd);
    for(let skillSectionId in skills){
      for(let skillId in skills[skillSectionId].skills){
        if(skillId === skill){
          let skillValue = skills[skillSectionId].skills[skillId].value + valueToAdd;
          return await this.changeSkillValue(skill, skillValue);
        }
      }
    }
    return null;
  }

  async _onChangeSkillValue(event) {
    event.preventDefault();
    const skillIndex = event.currentTarget.attributes['data-skill'].value;
    return await this.changeSkillValue(skillIndex, event.target.value);
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
      return null;
    }
    const method = '_onDrop'+item.type.charAt(0).toUpperCase()+item.type.slice(1);
    if(this[method]){
      await this[method](item);
    }
    return await super._onDropItem(event, data);
  }

  async _onRemoveItem(id){
    const item = this.actor.items.get(id);
    if(item){
      const method = '_onRemove'+item.type.charAt(0).toUpperCase()+item.type.slice(1);
      if(!this[method]){
        return null;
      }
      return await this[method](item);
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
    console.log(event);
    const elements = event.currentTarget.closest('.tablerow').getElementsByClassName("tabledescripion");
    for(const x of elements){
      console.log(x);
      if(x.style.display === 'block'){
        x.style.display = 'none';
      } else {
        x.style.display = 'block';
      }
    }
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".changeStatusValue").change(this._onChangeStatusValue.bind(this));
    html.find(".changeSkillValue").change(this._onChangeSkillValue.bind(this));
    html.find(".changeCapValue").change(this._onChangeCapValue.bind(this));
    html.find(".clickChecked").click(this._onClickChecked.bind(this));
    html.find(".clickRemoveItem").click(this._onClickRemoveItem.bind(this));
    html.find(".onChangeActiveDescription").click(this._onChangeActiveDescription.bind(this));
  }
}
