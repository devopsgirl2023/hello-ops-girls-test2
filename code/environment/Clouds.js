import { Entity, EntityID } from "../entities/Entity.js";
import { SpriteManager } from "../graphics/SpriteManager.js";
import { Vector2D } from "../math/Vector2D.js";
export class Clouds extends Entity {
    constructor(tween) {
        // This will preserve the ratio of the cloud images.
        super(30, 15, 200, 98, EntityID.Clouds);
        this.margin = 25;
        const sm = SpriteManager.instance;
        this.imgs = new Array();
        for (let i = 0; i < 4; i++)
            this.imgs.push(sm.get(`clouds${i}`));
        this.imgs.push(sm.get("clouds2"));
        this.direction = new Vector2D(0, 0);
        this.tween = tween;
    }
    update() {
        // If the first cloud is not visible, shuffle the images for continuousness-ness
        if (this.bounds.pos.x + this.bounds.size.width < 0) {
            const tmpImgs = this.imgs;
            const len = this.imgs.length;
            for (let i = 0; i < len; i++)
                this.imgs[i] = tmpImgs[(i + 1) % len];
            this.bounds.pos.x = this.margin;
        }
        this.bounds.pos.add(this.direction);
    }
    render(gfx) {
        const { x, y } = this.bounds.pos;
        const { width, height } = this.bounds.size;
        for (let i = 0; i < this.imgs.length; i++) {
            gfx.drawImageScaled(this.imgs[i], x + i * (width + this.margin), y, width, height);
        }
    }
    hit(e) { } // eslint-disable-line @typescript-eslint/no-unused-vars
    setRelativeSpeedX(speed) {
        this.direction.x = -speed * this.tween;
    }
}
