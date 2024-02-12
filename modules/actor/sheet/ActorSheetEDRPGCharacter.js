import ActorSheetEDRPG from "./ActorSheetEDRPG.js";
import EDRPGSkillTests from "../../tests/EDRPGSkillTests.js";

export default class ActorSheetEDRPGCharacter extends ActorSheetEDRPG {

  validItemTypes = [
    'Backgrounds',
    'Enhancements',
    'Karma Capabilities',
    'Armour',
    'Cybernetics',
    'General Equipment',
    'Ranged Weapons',
    'Melee Weapons',
    'Ammo Clips',
    'Wearables',
  ];

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

  async _onDropBackgrounds(item) {
    return await this.actor.addBackgrounds(item);
  }

  async _onRemoveBackgrounds(item) {
    return await this.actor.removeBackgrounds(item);
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
