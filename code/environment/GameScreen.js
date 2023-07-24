import { Dimension } from "../math/Dimension.js";
/**
 * Store all the information about the screen in one place
 * to make accessing to it easier and more concise.
 */
export var GameScreen;
(function (GameScreen) {
    GameScreen.CANVAS_ID = "gameCanvas";
    GameScreen.HUD_ID = "score";
    let _size;
    /**
     * @returns the dimensions of the screen.
     */
    function size() {
        if (_size === undefined) {
            const canv = document.getElementById(GameScreen.CANVAS_ID);
            _size = new Dimension(canv.width, canv.height);
        }
        return _size;
    }
    GameScreen.size = size;
})(GameScreen || (GameScreen = {}));
