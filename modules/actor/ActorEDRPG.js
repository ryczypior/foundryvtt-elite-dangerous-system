import EDRPGUtils from "../system/EDRPGUtils";
import EDRPG from "../system/EDRPG";
import EDRPGSkillTests from "../tests/EDRPGSkillTests";

export default class ActorEDRPG extends Actor {

  speakerData(token) {
    if (this.isToken || token) {
      return {
        token: token?.id || this.token.id,
        scene: token?.parent.id || this.token.parent.id
      }
    }
    return {
      actor: this.id,
      token: token?.id,
      scene: token?.parent.id
    }
  }

  async changeSkillValue(skill, value){
    const skills = duplicate(this._source.system.skills);
    value = Number(value);
    for(let skillSectionId in skills){
      for(let skillId in skills[skillSectionId].skills){
        if(skillId === skill){
          let maxCap = skills[skillSectionId].skills[skillId].maxCapModifier + this._source.system.status.rank.value.skillCap;
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
    return await this.updateSource({"system.skills": skills});
  }

  /**
   * @param skillsToChange [{skillId, skillValue}]
   */
  async addSkillValue(skillsToChange){
    const skills = duplicate(this._source.system.skills);
    skillsToChange.forEach(element => {
      for(let skillSectionId in skills){
        for(let skillId in skills[skillSectionId].skills){
          if(skillId === element.skillId){
            let maxCap = skills[skillSectionId].skills[skillId].maxCapModifier + this._source.system.status.rank.value.skillCap;
            let skillValue = skills[skillSectionId].skills[skillId].value + element.skillValue;
            if(skillValue > maxCap){
              skillValue = maxCap;
            } else if (skillValue < 10){
              skillValue = 10;
            }
            skills[skillSectionId].skills[skillId].value = skillValue;
            skills[skillSectionId].skills[skillId].bonus = Math.floor(skills[skillSectionId].skills[skillId].value / 10);
          }
        }
      }
    });
    return await this.updateSource({"system.skills": skills});
  }

  async addBackgrounds(item) {
    const effects = item.system.backgrounds.effects;
    const skills = [];
    if (effects && effects.length) {
      effects.forEach(effect => {
        if (effect.type === 'skill') {
          skills.push(effect);
        }
        /** @todo other types! **/
      });
    }
    if(skills.length > 0){
      await this.addSkillValue(skills);
    }
    return true;
  }

  async removeBackgrounds(item) {
    const effects = item.system.backgrounds.effects;
    const skills = [];
    if (effects && effects.length) {
      effects.forEach(effect => {
        if (effect.type === 'skill') {
          skills.push({skillId: effect.skillId, skillValue: -effect.skillValue});
        }
        /** @todo other types! **/
      });
    }
    if(skills.length > 0){
      await this.addSkillValue(skills);
    }
    return true;
  }

  async calculateSocialFactor(){
    console.log(this);
    const socialFactor = duplicate(this._source.system.socialFactor);
    const cap = parseInt(game.settings.get("edrpg", 'socialFactorCap'), 10);
    socialFactor.sfWornItems.value = 0;
    this.items.forEach(item => {
      console.log(item);
    });
    socialFactor.sfHonoraryRanks.value = parseInt(this._source.system.honoraryRanks.imperial.socialFactor, 10) + parseInt(this._source.system.honoraryRanks.federation.socialFactor, 10);
    socialFactor.sfTotal.value = parseInt(socialFactor.sfOther.value, 10) + parseInt(socialFactor.sfHonoraryRanks.value, 10) + parseInt(socialFactor.sfWornItems.value, 10);
    if(cap > 0 && cap < socialFactor.sfTotal.value){
      socialFactor.sfTotal.value = cap;
    }
    return await this.update({"system.socialFactor": socialFactor});
  }

  async _preCreate(data, options, user) {
    await super._preCreate(data, options, user);
    const skills = duplicate(this._source.system.skills);
    if(Object.keys(skills).length === 0){
      await this.updateSource({ "system.skills": duplicate(EDRPG.skills) });
    }
    const items = this.items.map((i) => i.toObject())
    /** Add default items */
    if (this.type === 'character'){
      const pilotTrained = await EDRPGUtils.findItemByInternalID('PILOT TRAINED', 'backgrounds');
      if(pilotTrained){
        let object = pilotTrained.toObject();
        object.system.removable.value = false;
        object.system.backgrounds.choices.value = 0;
        items.push(object);
        await this.updateSource({ items });
        this.addBackgrounds(pilotTrained);
      }
      const escapeDeath = await EDRPGUtils.findItemByInternalID('ESCAPE DEATH', 'Karma Capabilities');
      if(escapeDeath){
        let object = escapeDeath.toObject();
        object.system.removable.value = false;
        items.push(object);
        await this.updateSource({ items });
      }
    }
  }

  findItemByInternalID(internalId, type = null) {

  }

  prepareBaseData() {
    super.prepareBaseData();
  }
}

