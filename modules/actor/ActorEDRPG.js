export default class ActorEDRPG extends Actor {

  speakerData(token) {
    if (this.isToken || token) {
      return {
        token: token?.id || this.token.id,
        scene: token?.parent.id || this.token.parent.id
      }
    }
    return {
      actor: this.id,
      token: token?.id,
      scene: token?.parent.id
    }
  }

  prepareBaseData() {
    super.prepareBaseData();
  }
}

