import ActorSheetEDRPG from "./ActorSheetEDRPG.js";

export default class ActorSheetEDRPGCharacter extends ActorSheetEDRPG {
  get template() {
    let template = super.template;
    if (!game.user.isGM && this.actor.limited) return "systems/edrpg/templates/sheets/character-limited.html";
    return "systems/edrpg/templates/sheets/character-sheet.html";
  }

  async _checkRankPoints() {
    let status = duplicate(this.actor.system.status);
    let currentPoints = status.rankPoints.value;
    for (let rankIndex of Object.keys(game.edrpg.config.ranks)) {
      const rank = game.edrpg.config.ranks[rankIndex];
      if (currentPoints >= rank.minRankPoints && (currentPoints <= rank.maxRankPoints || rank.maxRankPoints === null)) {
        status.rank.value = rank;
      }
    }
    return await this.actor.update({"system.status": status});
  }

  async _onChangeStatusValue(event) {
    let ret = await super._onChangeStatusValue(event);
    if (event.currentTarget.attributes['data-stateid'].value === 'rankPoints') {
      ret = await this._checkRankPoints();
    }
    return ret;
  }

  async _onSkillClick(event) {
    const skillId = event.target.getAttribute('data-skill');
    const skillSectionId = event.target.getAttribute('data-section');
    const skills = duplicate(this.actor._source.system.skills);
    const skill = skills[skillSectionId].skills[skillId];
    if(skills[skillSectionId].skills[skillId].isChecked === 0){
      skills[skillSectionId].skills[skillId].isChecked = 1;
      await this.actor.update({"system.skills": skills});
    }
    let roll = await new Roll("1d10").roll({ async: true });
    console.log(roll.total, skill);
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.skill-roll').click(this._onSkillClick.bind(this));
  }
}
