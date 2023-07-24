import { GameScreen } from "./GameScreen.js";
/**
 * Class to represent the heads up display (HUD).
 */
export class HUD {
    /**
     * @param score the score counter.
     * @param difficulty the difficulty counter.
     */
    constructor(score, difficulty) {
        this.score = score;
        this.difficulty = difficulty;
        this.hudText = document.getElementById(GameScreen.HUD_ID);
    }
    update() {
        let text = "";
        text += `Score: ${this.score.value}`;
        text += `<br />`;
        text += `Difficulty: ${this.difficulty.value}`;
        this.hudText.innerHTML = text;
    }
}
