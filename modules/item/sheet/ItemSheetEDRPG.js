export default class ItemSheetEDRPG extends ItemSheet {
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.tabs = [{navSelector: ".tabs", contentSelector: ".content", initial: "main"}]
    options.height = 500;
    options.width = 900;
    return options;
  }

  async getData() {
    const sheetData = await super.getData();
    sheetData.system = sheetData.data.system // project system data so that handlebars has the same name and value paths
    sheetData.enrichment = await this._handleEnrichment(sheetData.system);
    return sheetData;
  }

  async _handleEnrichment(system)
  {
    let enrichment = {}
    enrichment["system.details.description.value"] = await TextEditor.enrichHTML(system.details.description.value, { async: true })
    enrichment["system.details.gmdescription.value"] = await TextEditor.enrichHTML(system.details.gmdescription.value, { async: true })
    return expandObject(enrichment);
  }

  _onRemoveFromCharacter(actor){
    return null;
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
