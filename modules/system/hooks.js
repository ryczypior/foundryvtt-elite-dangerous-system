import * as initHooks from "../hooks/init.js"
import * as handlebarsHooks from "../hooks/handlebars.js";
import ChatMessageEDRPG from "./ChatMessageEDRPG.js";

export default function registerHooks() {
  initHooks.default();
  handlebarsHooks.default();


  // #if _ENV === "development"
  Hooks.on("renderApplication", (app, html, data) => {
  });
  //#endif
  Hooks.on('renderChatMessage', (message, html, data) => {
    ChatMessageEDRPG.activateListeners(html, message, data);
  });

}
