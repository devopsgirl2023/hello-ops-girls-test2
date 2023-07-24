/**
 * A class to represent a 2 dimensional vector.
 * This vector can be used to determine position,
 * direction, and what not. This class offer some
 * basic vector operations as well.
 */
export class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }
    toAdded(v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }
    flip() {
        this.x = -this.x;
        this.y = -this.y;
    }
    toFlipped() {
        return new Vector2D(-this.x, -this.y);
    }
    set(v) {
        this.x = v.x;
        this.y = v.y;
    }
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    toScaled(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }
}
Vector2D.ZERO = new Vector2D();
