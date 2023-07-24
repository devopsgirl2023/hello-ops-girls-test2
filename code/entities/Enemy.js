import { GameScreen } from "../environment/GameScreen.js";
import { SpriteManager } from "../graphics/SpriteManager.js";
import { Vector2D } from "../math/Vector2D.js";
import { Entity, EntityID } from "./Entity.js";
/**
 * Instance for each of the enemies. Creating an enemy is
 * a bit complex therefore an enemy should be usually generated using
 * an EnemyFactory.
 */
export class Enemy extends Entity {
    /**
     * @param x the starting x coordinate of the instance.
     * @param y the starting y coordinate of the instnace.
     * @param width the width of the instance (image will be drawn accordingly).
     * @param height the height of the instance (image will be drawn accordingly).
     * @param img the Sprite/HTMLImageElement of the instance.
     */
    constructor(x, y, width, height, img) {
        super(x, y, width, height, EntityID.Enemy);
        this.img = img;
    }
    update() {
        this.bounds.pos.add(this.direction);
    }
    render(gfx) {
        gfx.drawImageInBounds(this.img, this.bounds);
    }
    hit(e) { } // eslint-disable-line @typescript-eslint/no-unused-vars
}
/**
 * Enum for each type of enemy that exists. This will be used
 * in generating the instances of each enemy and is
 * more related to the EnemyFactory.
 */
export var EnemyType;
(function (EnemyType) {
    EnemyType[EnemyType["Short"] = 0] = "Short";
    EnemyType[EnemyType["Tall"] = 1] = "Tall";
    EnemyType[EnemyType["Flying"] = 2] = "Flying";
})(EnemyType || (EnemyType = {}));
/**
 * Class to generate instances of each type of enemy.
 * This class uses the factory design pattern and allows
 * us to have a randomly generated instances.
 */
export class EnemyFactory {
    /**
     * @param worldInfo the information about the world.
     */
    constructor(worldInfo) {
        const sm = SpriteManager.instance;
        this.shortImage = sm.get("shortEnemy");
        this.tallImage = sm.get("tallEnemy");
        this.flyingImage = sm.get("flyingEnemy");
        this.screenSize = GameScreen.size();
        this.worldInfo = worldInfo;
    }
    /**
     * Generate an instance of an enemy on demand.
     *
     * @param speed the speed the enemy will move at.
     * The speed is for the x axis and will be how fast
     * the enemy should move to the left.
     * @param type the type of the enemy to generate.
     * @returns the generated enemy instance.
     */
    generate(speed, type) {
        let width;
        let height;
        let image;
        // DON'T FORGET THE BREAK STATEMENTS.
        // Specific properties for each enemy type. This is why we have
        // a factory to generate the instances.
        switch (type) {
            case EnemyType.Tall:
                width = 32;
                height = 64;
                image = this.tallImage;
                break;
            case EnemyType.Short:
                width = 48;
                height = 32;
                image = this.shortImage;
                break;
            case EnemyType.Flying:
                width = 32;
                height = 24;
                image = this.flyingImage;
                break;
        }
        const dir = new Vector2D(-speed, 0);
        const x = this.screenSize.width;
        let y = this.screenSize.height - this.worldInfo.groundHeight - height;
        if (type === EnemyType.Flying)
            y -= (Math.random() * 120 + 70);
        const e = new Enemy(x, y, width, height, image);
        e.setDirection(dir);
        return e;
    }
    /**
     * Generates a random enemy based on some random probability
     * that was chosen arbitrarily.
     *
     * @param speed the speed the enemy will move at.
     * The speed is for the x axis and will be how fast
     * the enemy should move to the left.
     * @returns the randomly generated instance of an enemy.
     */
    generateRandom(speed) {
        const rand = Math.random() * 300;
        if (0 <= rand && rand < 125)
            return this.generate(speed, EnemyType.Tall);
        if (125 <= rand && rand < 250)
            return this.generate(speed, EnemyType.Short);
        else
            return this.generate(speed, EnemyType.Flying);
    }
}
