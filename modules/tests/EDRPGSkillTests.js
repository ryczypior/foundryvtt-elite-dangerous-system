import EDRPGTests from "./EDRPGTests.js";

export default class EDRPGSkillTests extends EDRPGTests {
  constructor(skill, actor) {
    const data = {
      title: game.i18n.format('TEST.SkillCheck', {skill: game.i18n.localize(skill.label)}),
      test: '1d10',
      testName: skill.label,
      bonus: skill.bonus,
      difficulty: skill.difficulty,
      bonusModifier: 0,
      callback: skill.callback,
    }
    super(data, actor);
    this.skill = skill;
  }

  async prepareTest() {
    const data = {
      skillName: this.skill.label,
      skillBonus: this.skill.bonus,
      testDifficulty: this.skill.difficulty,
      difficultyNumbers: this.difficultyNumbers,
    };
    const callback = (html) => {
      this.roll();
    };
    let html = await renderTemplate("/systems/edrpg/templates/tests/skill-test.html", data);

    return new Promise((resolve, reject) => {
      new Dialog(
        {
          title: this.data.title,
          content: html,
          actor: this.actor,
          data,
          buttons:
            {
              rollButton:
                {
                  label: game.i18n.localize("TEST.Roll"),
                  callback: html => resolve(callback(html))
                }
            },
          default: "rollButton",
          render: html => this.activateListeners(html)
        }).render(true);
    })
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}
