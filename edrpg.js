import ActorEDRPG from "./modules/actor/ActorEDRPG.js";
import ActorSheetEDRPG from "./modules/actor/sheet/ActorSheetEDRPG.js";
import ActorSheetEDRPGCharacter from "./modules/actor/sheet/ActorSheetEDRPGCharacter.js";
import ItemEDRPG from "./modules/item/ItemEDRPG.js";
import ItemSheetEDRPG from "./modules/item/sheet/ItemSheetEDRPG.js";
import ItemSheetEDRPGBackground from "./modules/item/sheet/ItemSheetEDRPGBackground.js";
import ItemSheetEDRPGEnhancement from "./modules/item/sheet/ItemSheetEDRPGEnhancement.js";
import ItemSheetEDRPGKarmaCap from "./modules/item/sheet/ItemSheetEDRPGKarmaCap.js";
import registerHooks from "./modules/system/hooks.js"
import EDRPG from "./modules/system/EDRPG";

Hooks.once("init", async function () {
  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('edrpg', ActorSheetEDRPGCharacter, {types: ['character'], makeDefault: true});
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('edrpg', ItemSheetEDRPGBackground, {types: ['backgrounds'], makeDefault: true});
  Items.registerSheet('edrpg', ItemSheetEDRPGEnhancement, {types: ['enhancements'], makeDefault: true});
  Items.registerSheet('edrpg', ItemSheetEDRPGKarmaCap, {types: ['karmacap'], makeDefault: true});
  game.edrpg = {
    apps: {
      ActorSheetEDRPG,
      ActorSheetEDRPGCharacter,
      ItemSheetEDRPG,
      ItemSheetEDRPGBackground,
      ItemSheetEDRPGEnhancement,
      ItemSheetEDRPGKarmaCap,
    },
    entities: {
      ActorEDRPG,
      ItemEDRPG
    },
    config: EDRPG,
  };
  CONFIG.Actor.documentClass = ActorEDRPG;
  CONFIG.Item.documentClass = ItemEDRPG;
});

registerHooks();
