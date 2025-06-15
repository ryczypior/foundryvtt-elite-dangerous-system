import EDRPG from "../system/EDRPG";

export default function () {

  Hooks.on("init", () => {
    Handlebars.registerHelper("ifIsGM", function (options) {
      return game.user.isGM ? options.fn(this) : options.inverse(this)
    });

    Handlebars.registerHelper("isGM", function (options) {
      return game.user.isGM
    });

    Handlebars.registerHelper("eq", function (val1, val2) {
      return val1 == val2;
    });

    Handlebars.registerHelper("in", function (val1, val2) {
      const arry = String(val2).split('|');
      return arry.indexOf(val1) !== -1;
    });

    Handlebars.registerHelper("formatCredits", function (val) {
      return (new Intl.NumberFormat(navigator.language, {maximumSignificantDigits: 2})).format(val);
    });

    Handlebars.registerHelper("config", function (key) {
      return game.edrpg.config[key]
    });

    Handlebars.registerHelper("configLookup", function (obj, key) {
      if (obj && key)
        return game.edrpg.config[obj]?.[key]
    });

    Handlebars.registerHelper("array", function (array, cls) {
      if (typeof cls == "string")
        return array.map(i => `<a class="${cls}">${i}</a>`).join(`<h1 class="${cls} comma">, </h1>`)
      else
        return array.join(", ")
    });

    Handlebars.registerHelper("tokenImg", function (actor) {
      let tokens = actor.getActiveTokens();
      let tokenDocument = actor.prototypeToken;
      if (tokens.length == 1) {
        tokenDocument = tokens[0].document;
      }
      return tokenDocument.hidden ? "systems/edrpg/tokens/unknown.png" : tokenDocument.texture.src;
    });

    Handlebars.registerHelper("tokenName", function (actor) {
      let tokens = actor.getActiveTokens();
      let tokenDocument = actor.prototypeToken;
      if (tokens.length == 1) {
        tokenDocument = tokens[0].document;
      }
      return tokenDocument.hidden ? "???" : tokenDocument.name;
    });

    Handlebars.registerHelper('formatNumber', function(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    });

    Handlebars.registerHelper("settings", function (key) {
      return game.settings.get("edrpg", key);
    });
  })
}
