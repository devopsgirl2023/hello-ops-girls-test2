import { KeyCode, Keys } from "../engine/Keys.js";
import { Animation } from "../graphics/Animation.js";
import { SpriteManager } from "../graphics/SpriteManager.js";
import { Vector2D } from "../math/Vector2D.js";
import { Entity, EntityID } from "./Entity.js";
/**
 * Class for the player instance. There will be probably only one
 * instance in the game.
 */
export class Player extends Entity {
    /**
     * @param worldInfo the info about the world to create the player.
     */
    constructor(worldInfo) {
        super(0, 0, 40, 64, EntityID.Player);
        this.jumpingForce = new Vector2D(0, -10);
        const sm = SpriteManager.instance;
        this.standingSprite = sm.get("playerStanding");
        this.runningAnimation = new Animation(8, "playerRunning0", "playerRunning1", "playerRunning2", "playerRunning3", "playerRunning4", "playerRunning5", "playerRunning6", "playerRunning7");
        this.worldInfo = worldInfo;
        this.keyboard = Keys.instance;
        this.reset();
    }
    reset() {
        this.bounds.pos = this.worldInfo.spawnPoint;
        this.alive = true;
        this.moving = false;
        this.jumping = false;
        this.direction.set(Vector2D.ZERO);
    }
    update() {
        if (this.keyboard.isClicked(KeyCode.Space)) {
            if (!this.moving)
                this.moving = true;
            if (!this.jumping) {
                this.jumping = true;
                this.direction.set(this.jumpingForce);
            }
        }
        if (this.moving)
            this.runningAnimation.update();
        this.jumpingLogic();
        this.bounds.pos.add(this.direction);
    }
    jumpingLogic() {
        if (!this.jumping)
            return;
        const scalar = this.keyboard.isPressed(KeyCode.Space) ? 0.6 : 1;
        this.direction.add(this.worldInfo.gravity.toScaled(scalar));
    }
    render(gfx) {
        if (!this.moving)
            gfx.drawImageInBounds(this.standingSprite, this.bounds);
        else
            gfx.drawImageInBounds(this.runningAnimation.current, this.bounds);
    }
    hit(e) {
        if (e.is(EntityID.Ground)) {
            this.jumping = false;
            this.bounds.pos.y = e.getBounds().pos.y - this.bounds.size.height;
            this.direction.set(Vector2D.ZERO);
        }
        else if (e.is(EntityID.Enemy)) {
            this.moving = false;
            this.alive = false;
            this.jumping = false;
            this.direction.set(Vector2D.ZERO);
        }
    }
    isAlive() {
        return this.alive;
    }
    isMoving() {
        return this.moving;
    }
}
