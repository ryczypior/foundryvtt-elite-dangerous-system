export default function() {
  /**
   * Init function loads tables, registers settings, and loads templates
   */
  Hooks.once("init", () => {

    loadTemplates([
      "systems/edrpg/templates/sheets/character-sheet.html",
      "systems/edrpg/templates/sheets/partials/actor-backgrounds.html",
      "systems/edrpg/templates/sheets/partials/actor-combat.html",
      "systems/edrpg/templates/sheets/partials/actor-details.html",
      "systems/edrpg/templates/sheets/partials/actor-equipment.html",
      "systems/edrpg/templates/sheets/partials/actor-karma.html",
      "systems/edrpg/templates/sheets/partials/actor-main.html",
      "systems/edrpg/templates/sheets/partials/actor-skills.html",
      "systems/edrpg/templates/items/backgrounds.html",
      "systems/edrpg/templates/items/enhancements.html",
      "systems/edrpg/templates/items/karma-capabilities.html",
      "systems/edrpg/templates/items/partials/item-all-description.html",
      "systems/edrpg/templates/items/partials/item-backgrounds.html",
      "systems/edrpg/templates/items/partials/item-karma.html",
   ]);
  });
}
