export default class EDRPGTests{
  constructor(data, actor){
    if(!data){
      data = {};
    }
    this.actor = actor;
    this.data = {
      preData: {
        title: data.title,
        difficulty: data.difficulty,
        skillScore: data.skillScore,
        skillBonus: data.skillBonus,
        skillBonusModifier: data.skillBonusModifier || 0,
        hitLocation: data.hitLocation || false,
        target: data.target,
        rollClass: this.constructor.name,
      },
      result: {
        roll: data.roll
      },
      context: {
        rollMode: data.rollMode,
        reroll: false,
        edited: false,
        messageId: data.messageId,
        speaker: data.speaker,
        postFunction: data.postFunction,
        targets: data.targets,
        opposedMessageIds : data.opposedMessageIds || [],
        karmaUsedReroll: data.karmaUsedReroll,
      }
    }
    if (this.data.context.speaker && this.actor.isOpposing && this.data.context.targets.length)
    {
      ui.notifications.notify(game.i18n.localize("TEST.TargetingCancelled"))
      this.data.context.targets = [];
    }

    if (!this.data.context.speaker && actor) {
      this.data.context.speaker = actor.speakerData();
    }
  }

  /**
   * Add support for the Dice So Nice module
   * @param {Object} roll
   * @param {String} rollMode
   */
  async _showDiceSoNice(roll, rollMode, speaker) {
    if (game.modules.get("dice-so-nice") && game.modules.get("dice-so-nice").active) {

      if (game.settings.get("dice-so-nice", "hideNpcRolls")) {
        let actorType = null;
        if (speaker.actor)
          actorType = game.actors.get(speaker.actor).type;
        else if (speaker.token && speaker.scene)
          actorType = game.scenes.get(speaker.scene).tokens.get(speaker.token).actor.type;
        if (actorType != "character")
          return;
      }

      let whisper = null;
      let blind = false;
      let sync = true;
      switch (rollMode) {
        case "blindroll": //GM only
          blind = true;
        case "gmroll": //GM + rolling player
          let gmList = game.users.filter(user => user.isGM);
          let gmIDList = [];
          gmList.forEach(gm => gmIDList.push(gm.id));
          whisper = gmIDList;
          break;
        case "selfroll":
          sync = false;
          break;
        case "roll": //everybody
          let userList = game.users.filter(user => user.active);
          let userIDList = [];
          userList.forEach(user => userIDList.push(user.id));
          whisper = userIDList;
          break;
      }
      await game.dice3d.showForRoll(roll, game.user, sync, whisper, blind);
    }
  }

  async rollDices() {
    if (isNaN(this.preData.roll)) {
      let roll = await new Roll("1d100").roll({ async: true });
      await this._showDiceSoNice(roll, this.context.rollMode || "roll", this.context.speaker);
      this.result.roll = roll.total;
    }
    else
      this.result.roll = this.preData.roll;
  }

};
