import EDRPG from "../../system/EDRPG";

export default class ActorSheetEDRPG extends ActorSheet {
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
    console.log(Object.keys(skills).length);
    if(Object.keys(skills).length === 0){
      this.actor.update({ "system.skills": duplicate(EDRPG.skills) });
    }
    return template;
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.system = sheetData.data.system // project system data so that handlebars has the same name and value paths
    sheetData.items = sheetData.data.items;
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

  async _onChangeSkillValue(event) {
    event.preventDefault();
    const skills = duplicate(this.actor._source.system.skills);
    const skillIndex = event.currentTarget.attributes['data-skill'].value;
    const skillSectionIndex = event.currentTarget.attributes['data-section'].value;
    if (isNaN(event.target.value)) {
      event.target.value = skills[skillSectionIndex].skills[skillIndex].value;
      return;
    }
    let maxCap = skills[skillSectionIndex].skills[skillIndex].maxCapModifier + this.actor._source.system.status.rank.value.skillCap;
    /* maximum cap cannot be more than 100 */
    if(maxCap > 100){
      maxCap = 100;
    }
    if (event.target.value > maxCap) {
      event.target.value = maxCap;
    }
    skills[skillSectionIndex].skills[skillIndex].value = Number(event.target.value);
    skills[skillSectionIndex].skills[skillIndex].bonus = Math.floor(skills[skillSectionIndex].skills[skillIndex].value / 10);
    return await this.actor.update({"system.skills": skills});
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
    console.log('ok', event, data, this.actor);
    return super._onDropItem(event, data);
  }

  _onClickRemoveItem(event){
    event.preventDefault();
    const id = event.currentTarget.attributes['data-id'].value;
    this.actor.deleteEmbeddedDocuments("Item", [id]);
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".changeStatusValue").change(this._onChangeStatusValue.bind(this));
    html.find(".changeSkillValue").change(this._onChangeSkillValue.bind(this));
    html.find(".changeCapValue").change(this._onChangeCapValue.bind(this));
    html.find(".clickChecked").click(this._onClickChecked.bind(this));
    html.find(".clickRemoveItem").click(this._onClickRemoveItem.bind(this));
  }
}
