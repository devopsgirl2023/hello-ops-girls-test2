/**
 * Class to wrap the graphics handling in the game in a more
 * compact and self contained way.
 */
export class Graphics {
    /**
     * @param canvasID the HTML canvas element ID as stated in the html file.
     */
    constructor(canvasID) {
        this._canvas = document.getElementById(canvasID);
        this._ctx = this.canvas.getContext("2d");
        this._width = this.canvas.width;
        this._height = this.canvas.height;
        this._ctx.imageSmoothingEnabled = true;
        this._ctx.imageSmoothingQuality = "low";
    }
    /**
     * Draws a rectangle and fills it with a specified color.
     *
     * @param x top left x coordinate.
     * @param y top left y coordinate.
     * @param w width of the rectangle.
     * @param h height of the rectangle.
     * @param color the color to fill the rectangle with.
     */
    fillRect(x, y, w, h, color) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    /**
     * @param r the rectangle to fill
     * @param c the color to fill the rectangle with.
     */
    fill(r, c) {
        this.ctx.beginPath();
        this.ctx.rect(r.pos.x, r.pos.y, r.size.width, r.size.height);
        this.ctx.fillStyle = c;
        this.ctx.fill();
    }
    /**
     * Draws a rectangle with a specified color and stroke width.
     *
     * @param x top left x coordinate.
     * @param y top left y coordinate.
     * @param w width of the rectangle.
     * @param h height of the rectangle.
     * @param color the color to draw the rectangle with.
     * @param stroke the stroke width (in pixels) where -1 is the default value
     * that states to use the default value.
     */
    drawRect(x, y, w, h, color, stroke = -1) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.strokeStyle = color;
        if (stroke > -1)
            this.ctx.lineWidth = stroke;
        this.ctx.stroke();
    }
    /**
     * @param r the rectangle to draw the outline of.
     * @param c the color to draw the outline.
     * @param stroke the width of the outline.
     */
    draw(r, c, stroke = -1) {
        this.ctx.beginPath();
        this.ctx.rect(r.pos.x, r.pos.y, r.size.width, r.size.height);
        this.ctx.strokeStyle = c;
        if (stroke > -1)
            this.ctx.lineWidth = stroke;
        this.ctx.stroke();
    }
    /**
     * Draws an image to the screen at the given coordinates.
     *
     * @param img the image to draw.
     * @param x top left x coordinate.
     * @param y top left y coordinate.
     */
    drawImage(img, x, y) {
        this.ctx.drawImage(img, x, y);
    }
    /**
     * Draws an image to the screen at the given coordinates and with
     * the given dimensions.
     *
     * @param img the image to draw.
     * @param x top left x coordinate.
     * @param y top left y coordinate.
     * @param w width of the image where.
     * @param h height of the image.
     */
    drawImageScaled(img, x, y, w, h) {
        this.ctx.drawImage(img, x, y, w, h);
    }
    drawImageInBounds(img, bounds) {
        this.ctx.drawImage(img, bounds.pos.x, bounds.pos.y, bounds.size.width, bounds.size.height);
    }
    /**
     * Fills the entire background of the canvas with a specific color.
     *
     * @param color the color to fill the background with.
     */
    fillBackground(color) {
        this.fillRect(0, 0, this.width, this.height, color);
    }
    /**
     * Fills the entire background of the canvas with an image.
     *
     * @param img the image to fill the background with.
     */
    imgBackground(img) {
        this.drawImageScaled(img, 0, 0, this.width, this.height);
    }
    /**
     * Checks if a rectangle of given dimensions and position is
     * visible on the canvas or not.
     *
     * @param x the top left x coordinate.
     * @param y the top left y coordinate.
     * @param w the width of the rectangle.
     * @param h the height of the rectangle.
     * @returns whether the rectangle is visible.
     */
    isVisible(x, y, w, h) {
        return ((0 <= x && x <= this.width)
            || (0 <= x + w && x + w <= this.width))
            && ((0 <= y && y <= this.height)
                || (0 <= y + h && y + h <= this.height));
    }
    areBoundsIn(bounds) {
        return this.isVisible(bounds.pos.x, bounds.pos.y, bounds.size.width, bounds.size.height);
    }
    get canvas() {
        return this._canvas;
    }
    get ctx() {
        return this._ctx;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
}
