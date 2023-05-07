import EDRPGTests from "../tests/EDRPGTests";
import EDRPGUtils from "./EDRPGUtils";

export default class ChatMessageEDRPG {
  static async activateListeners (html, message, data){
    html.find('.reroll').click(ev => ChatMessageEDRPG._onReRollClick(ev, message, data));
  }

  static async _onReRollClick(event, message, data){
    const actor = EDRPGUtils.findActorById(message.flags.actor._id);
    if(!actor){
      ui.notifications.warn(game.i18n.localize('CHAT.ActorNotFound'));
      return;
    }
    const status = duplicate(actor._source.system.status);
    if(status.karma.value <= 0){
      ui.notifications.warn(game.i18n.localize('CHAT.NoKarmaPoints'));
      return;
    }
    status.karma.value = status.karma.value - 1;
    await actor.update({"system.status": status});
    const templateData = {
      title: game.i18n.localize('CHAT.ReRollUsingKarmaTitle'),
      message: game.i18n.format('CHAT.ReRollUsingKarmaMessage', {actorName: actor.name, testName: game.i18n.localize(message.flags.roll.testName)}),
      actorName: actor.name,
      actorImage: actor.img,
    };
    let html = await renderTemplate("/systems/edrpg/templates/chat/message.html", templateData);
    const chatOptions = {
      content: html,
      type: 0,
      user: game.user.id,
      speaker: ChatMessage.getSpeaker(actor.speakerData()),
    };
    await ChatMessage.create(chatOptions);
    const rollData = {...message.flags.roll};
    rollData.reroll = true;
    const test = new EDRPGTests(rollData, message.flags.actor);
    test.roll();
  }


}
