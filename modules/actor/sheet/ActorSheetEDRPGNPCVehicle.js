import ActorSheetEDRPG from "./ActorSheetEDRPG.js";
import EDRPGSkillTests from "../../tests/EDRPGSkillTests.js";

export default class ActorSheetEDRPGNPCVehicle extends ActorSheetEDRPG {

  get template() {
    let template = super.template;
    if (!game.user.isGM && this.actor.limited) return "systems/edrpg/templates/sheets/character-limited.html";
    return "systems/edrpg/templates/sheets/vehicle-sheet.html";
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.skill-roll').click(this._onSkillClick.bind(this));
  }
}
