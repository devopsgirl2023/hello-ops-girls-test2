import { Dimension } from "./Dimension.js";
import { Vector2D } from "./Vector2D.js";
/**
 * Class for a representation of a rectangle, where
 * a rectangle is just a position (vector) and size
 * (dimension).
 */
export class Rectangle {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this._pos = new Vector2D(x, y);
        this._size = new Dimension(width, height);
    }
    /**
     * Determine whether two rectangles intersects or not.
     *
     * @param r the rectangle to check against.
     * @returns whether the two rectangles intersect.
     */
    intersects(r) {
        const xOverlap = this.pos.x + this.size.width >= r.pos.x &&
            r.pos.x + r.size.width >= this.pos.x;
        const yOverlap = this.pos.y + this.size.height >= r.pos.y &&
            r.pos.y + r.size.height >= this.pos.y;
        return xOverlap && yOverlap;
    }
    get pos() {
        return this._pos;
    }
    set pos(v) {
        this._pos.set(v);
    }
    get size() {
        return this._size;
    }
    set size(s) {
        this._size.width = s.width;
        this._size.height = s.height;
    }
}
