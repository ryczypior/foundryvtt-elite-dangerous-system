export default function () {
  /**
   * Init function loads tables, registers settings, and loads templates
   */
  Hooks.once("init", () => {

    loadTemplates([
      "systems/edrpg/templates/sheets/character-sheet.html",
      "systems/edrpg/templates/sheets/partials/actor-backgrounds.html",
      "systems/edrpg/templates/sheets/partials/actor-enhancements.html",
      "systems/edrpg/templates/sheets/partials/actor-combat.html",
      "systems/edrpg/templates/sheets/partials/actor-details.html",
      "systems/edrpg/templates/sheets/partials/actor-equipment.html",
      "systems/edrpg/templates/sheets/partials/actor-karma.html",
      "systems/edrpg/templates/sheets/partials/actor-main.html",
      "systems/edrpg/templates/sheets/partials/actor-skills.html",
      "systems/edrpg/templates/items/backgrounds.html",
      "systems/edrpg/templates/items/enhancements.html",
      "systems/edrpg/templates/items/karma-capabilities.html",
      "systems/edrpg/templates/items/armour.html",
      "systems/edrpg/templates/items/partials/item-all-description.html",
      "systems/edrpg/templates/items/partials/item-all-cost.html",
      "systems/edrpg/templates/items/partials/item-backgrounds.html",
      "systems/edrpg/templates/items/partials/item-karma.html",
      "systems/edrpg/templates/items/partials/item-armour.html",
      "systems/edrpg/templates/tests/skill-test.html",
      "systems/edrpg/templates/chat/message.html",
      "systems/edrpg/templates/chat/roll/skill.html",
    ]);
    game.settings.register("edrpg", "systemMaxBackgrounds", {
      name: "SETTINGS.systemMaxBackgroundsName",
      hint: "SETTINGS.systemMaxBackgroundsHint",
      scope: "world",
      config: true,
      default: 4,
      type: Number
    });
    game.settings.register("edrpg", "defaultDifficultyNumber", {
      name: "SETTINGS.defaultDifficultyNumberName",
      hint: "SETTINGS.defaultDifficultyNumberHint",
      scope: "world",
      config: true,
      default: 9,
      type: Number
    });
    game.settings.register("edrpg", "allowToRerollAllTests", {
      name: "SETTINGS.allowToRerollAllTestsName",
      hint: "SETTINGS.allowToRerollAllTestsHint",
      scope: "world",
      config: true,
      default: false,
      type: Boolean
    });
  });
}
