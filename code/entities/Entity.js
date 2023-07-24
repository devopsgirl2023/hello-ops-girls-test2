import { Rectangle } from "../math/Rectangle.js";
import { Vector2D } from "../math/Vector2D.js";
/**
 * Enum for each type of entity we have. Since this
 * is a small (and simple) game we have only 3 enemies.
 */
export var EntityID;
(function (EntityID) {
    EntityID[EntityID["Player"] = 0] = "Player";
    EntityID[EntityID["Ground"] = 1] = "Ground";
    EntityID[EntityID["Enemy"] = 2] = "Enemy";
    EntityID[EntityID["Clouds"] = 3] = "Clouds";
})(EntityID || (EntityID = {}));
/**
 * The base class for each entity in the game.
 * Each entity (even if it does nothing) can be updated
 * and rendered.
 */
export class Entity {
    /**
     * @param x starting x coordinate of the entity.
     * @param y starting y coordinate of the entity.
     * @param width width of the entity.
     * @param height height of the entity.
     * @param id the id of the entity.
     */
    constructor(x, y, width, height, id) {
        this.bounds = new Rectangle(x, y, width, height);
        this.direction = new Vector2D;
        this.id = id;
    }
    /**
     * Getter for the bounds of the entity.
     *
     * @returns the bounds of the entity.
     */
    getBounds() {
        return this.bounds;
    }
    /**
     * Setter for the movement direction of the entity.
     *
     * @param dir the direction as a vector for the entity.
     */
    setDirection(dir) {
        this.direction.set(dir);
    }
    /**
     * Getter for the direction of the entity.
     *
     * @returns the current direction of the entity.
     */
    getDirection() {
        return this.direction;
    }
    /**
     * Determine whether this entity is of a certain type of entity.
     *
     * @param id the id to check with the entity.
     * @returns true if the entity has the same id, false otherwise.
     */
    is(id) {
        return this.id == id;
    }
}
