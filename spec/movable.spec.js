import { Movable } from "../movable";

describe("Movable class", function () {
    var m = null;

    beforeEach(function () {
        m = new Movable();
    });
    it("disallows incorrect creation", function () {
        var faultyCreation = function () { Movable(); };
        expect(faultyCreation).toThrow();
    });
    it("updates display position when told to", function () {
        m.moveTo(1.0, 1.0);
        m.updateDisplayPosition();
        expect(m.worldX).toBe(1.0);
        expect(m.worldY).toBe(1.0);
    });
});