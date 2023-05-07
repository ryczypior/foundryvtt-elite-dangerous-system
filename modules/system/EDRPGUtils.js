export default class EDRPGUtils{
  static findActorById(id){
    return game.actors.find(actor => actor.id == id);
  }
}
