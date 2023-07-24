/**
 * Class to represent a number value that can
 * be later on passed as reference and updated
 * on different instance.
 */
export class Counter {
    constructor(_value = 0) {
        this._value = _value;
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
    /**
     * Increment the counter by the specified amount (which by
     * default would be 1).
     *
     * @param amount the amount to increment by (1 by default).
     */
    inc(amount = 1) {
        this._value += amount;
    }
    /**
     * Decrement the counter by the specified amount (which by
     * default would be 1).
     *
     * @param amount the amount to decrement by (1 by default).
     */
    dec(amount = 1) {
        this._value -= amount;
    }
}
