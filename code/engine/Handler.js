/**
 * Handles instances of the class to manage drawing
 * and updating them. Can store a collection of it's
 * own type as well to have a more neatly sorted collection.
 */
export class Handler {
    constructor() {
        this.items = new Array();
    }
    update() {
        const tmp = this.items;
        for (let i = 0; i < tmp.length; i++)
            tmp[i].update();
    }
    render(gfx) {
        const tmp = this.items;
        for (let i = 0; i < tmp.length; i++)
            tmp[i].render(gfx);
    }
    /**
     * @param t the item to add.
     */
    add(t) {
        this.items.push(t);
    }
    /**
     * @param t the item to remove.
     */
    remove(t) {
        const index = this.items.indexOf(t);
        if (index > -1)
            this.items.splice(index, 1);
    }
    get length() {
        return this.items.length;
    }
    /**
     * @param i the index to get the object in that place.
     * @returns the object, of one exists.
     */
    get(i) {
        return this.items[i];
    }
    /**
     * Clears the handler of all elements.
     */
    clear() {
        this.items = new Array();
    }
}
