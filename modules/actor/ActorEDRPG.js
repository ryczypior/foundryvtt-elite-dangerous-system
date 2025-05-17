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

  findSkillByInternalId(internalId) {
    for (let item of this.items) {
      if (item.system.internalId.value && item.system.internalId.value.toLowerCase() === internalId.toLowerCase()) {
        return item;
      }
    }
    return null;
  }


  async updateMainAttributes() {
    const dodge = this.findSkillByInternalId('dodge');
    const initiative = this.findSkillByInternalId('tactics');
    const parry = this.findSkillByInternalId('parry');
    const updateAttributes = {};
    if (dodge) {
      updateAttributes['system.info.dodge.value'] = dodge.system.skill.skillBonus.value;
    }
    if (parry) {
      updateAttributes['system.info.initiative.value'] = parry.system.skill.skillBonus.value;
    }
    if (initiative) {
      updateAttributes['system.info.parry.value'] = initiative.system.skill.skillBonus.value;
    }
    console.log(updateAttributes);
    return await this.update(updateAttributes);
  }

  async changeSkillValue(item, value) {
    value = Number(value);
    let maxCap = Number(item.system.skill.skillGenius.value) + Number(this._source.system.status.rank.value.skillCap);
    /* maximum cap cannot be more than 100 */
    if (maxCap > 100) {
      maxCap = 100;
    }
    if (value > maxCap) {
      ui.notifications.warn(game.i18n.format('WARN.MaxCapWarning', {
        maxCap: maxCap,
        skillValue: value,
        skillName: item.name,
      }));
      value = maxCap;
    }
    if (value < 0) {
      value = 0;
    }
    const updates = {
      'system.skill.skillScoreStart.value': value,
      'system.skill.skillBonus.value': Math.floor(value / 10),
    };
    await item.update(updates);
    return await this.updateMainAttributes();
  }

  async addSkillValue(skillsToChange) {
    for (const element of skillsToChange) {
      console.log(element);
      const item = this.findSkillByInternalId(element.skillId);
      if (item && item.system) {
        let maxCap = Number(item.system.skill.skillGenius.value) + Number(this._source.system.status.rank.value.skillCap);
        let skillValue = item.system.skill.skillScoreStart.value + Number(element.skillValue);
        if (skillValue > maxCap) {
          ui.notifications.warn(game.i18n.format('WARN.MaxCapWarning', {
            maxCap: maxCap,
            skillValue: skillValue,
            skillName: item.name,
          }));
          skillValue = maxCap;
        } else if (skillValue < 0) {
          skillValue = 0;
        }
        await item.update({
          'system.skill.skillScoreStart.value': skillValue,
          'system.skill.skillBonus.value': Math.floor(skillValue / 10),
        });
      }
    }
    //return await this.updateMainAttributes();
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
    if (skills.length > 0) {
      await this.addSkillValue(skills);
    }
    return true;
  }

  async findItem() {

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
    if (skills.length > 0) {
      await this.addSkillValue(skills);
    }
    return true;
  }

  async calculateSocialFactor() {
    const socialFactor = duplicate(this._source.system.socialFactor);
    const cap = parseInt(game.settings.get("edrpg", 'socialFactorCap'), 10);
    socialFactor.sfWornItems.value = 0;
    this.items.forEach(item => {
      socialFactor.sfWornItems.value += item.socialFactor;
    });
    socialFactor.sfHonoraryRanks.value = parseInt(this._source.system.honoraryRanks.imperial.socialFactor, 10) + parseInt(this._source.system.honoraryRanks.federation.socialFactor, 10);
    socialFactor.sfTotal.value = parseInt(socialFactor.sfOther.value, 10) + parseInt(socialFactor.sfHonoraryRanks.value, 10) + parseInt(socialFactor.sfWornItems.value, 10);
    if (cap > 0 && cap < socialFactor.sfTotal.value) {
      socialFactor.sfTotal.value = cap;
    }
    return await this.update({"system.socialFactor": socialFactor});
  }

  async _preCreate(data, options, user) {
    await super._onCreate(data, options, user);
    let items = this.items.map((i) => i.toObject())
    if (['Character', 'NPC'].indexOf(this.type) !== -1) {
      const skills = await EDRPGUtils.findItemsByType('Skills');
      for (let idx in skills) {
        let object = duplicate(skills[idx]);
        items.push(object);
      }
      await this.updateSource({items});
    }
  }

  async _onCreate(data, options, user) {
    await super._onCreate(data, options, user);
    /** Add default items */
    if (['Character', 'NPC'].indexOf(this.type) !== -1) {
      const pilotTrained = await EDRPGUtils.findItemByInternalID('PILOT TRAINED', 'Backgrounds');
      if (pilotTrained) {
        let items = this.items.map((i) => i.toObject())
        let object = pilotTrained.toObject();
        object.system.removable.value = false;
        object.system.backgrounds.choices.value = 0;
        items.push(object);
        await this.updateSource({items});
        await this.addBackgrounds(pilotTrained);
      }
      const escapeDeath = await EDRPGUtils.findItemByInternalID('ESCAPE DEATH', 'Karma Capabilities');
      if (escapeDeath) {
        let items = this.items.map((i) => i.toObject())
        let object = escapeDeath.toObject();
        object.system.removable.value = false;
        items.push(object);
        await this.updateSource({items});
      }
      const fighting = await EDRPGUtils.findItemByInternalID('Fighting', 'Melee Weapons');
      if (fighting) {
        let items = this.items.map((i) => i.toObject())
        let object = fighting.toObject();
        object.system.removable.value = false;
        items.push(object);
        await this.updateSource({items});
      }
      await this.updateMainAttributes();
    }
  }


  findItemByInternalID(internalId, type = null) {

  }

  prepareBaseData() {
    super.prepareBaseData();
  }
}
