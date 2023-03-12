import * as initHooks from "../hooks/init.js"
import * as handlebarsHooks from "../hooks/handlebars.js";

export default function registerHooks() {
  initHooks.default();
  handlebarsHooks.default();


  // #if _ENV === "development"
  Hooks.on("renderApplication", (app, html, data) => {
  });
  //#endif

}
