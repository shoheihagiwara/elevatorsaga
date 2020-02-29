import { Movable } from "../movable";

var timeForwarder = function(dt, stepSize, fn) {
	var accumulated = 0.0;
	while(accumulated < dt) {
		accumulated += stepSize;
		fn(stepSize);
	}
};

describe("Movable class", function () {
    var m = null;
    var mocHandlers = null;

    beforeAll(function () {
        mocHandlers = {
            someHandler: function () { },
            someOtherHandler: function () { }
        };
        for (let key in mocHandlers) {
            spyOn(mocHandlers, key).and.callThrough();
        }
    });

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

    it("updates display position when told to", function () {
        m.moveTo(1.0, 1.0);
        m.updateDisplayPosition();
        expect(m.worldX).toBe(1.0);
        expect(m.worldY).toBe(1.0);
    });
    it("does not update display position when moved", function () {
        m.moveTo(1.0, 1.0);
        expect(m.worldX).toBe(0.0);
        expect(m.worldY).toBe(0.0);
    });
    it("triggers event when moved", function () {
        m.on("new_state", mocHandlers.someHandler);
        m.moveTo(1.0, 1.0);
        expect(mocHandlers.someHandler).toHaveBeenCalled();
    });
    it("retains x pos when moveTo x is null", function () {
        m.moveTo(1.0, 1.0);
        m.moveTo(null, 2.0);
        expect(m.x).toBe(1.0);
    });
    it("retains y pos when moveTo y is null", function () {
        m.moveTo(1.0, 1.0);
        m.moveTo(2.0, null);
        expect(m.y).toBe(1.0);
    });
    it("gets new display position when parent is moved", function () {
        var mParent = new Movable();
        m.setParent(mParent);
        mParent.moveTo(2.0, 3.0);
        m.updateDisplayPosition();
        expect(m.x).toBe(0.0);
        expect(m.y).toBe(0.0);
        expect(m.worldX).toBe(2.0);
        expect(m.worldY).toBe(3.0);
    });
    it("moves to destination over time", function () {
        //obj.moveToOverTime = function(newX, newY, timeToSpend, interpolator, cb) {
        m.moveToOverTime(2.0, 3.0, 10.0, mocHandlers.someHandler);
        timeForwarder(10.0, 0.1, function (dt) { m.update(dt) });
        expect(m.x).toBe(2.0);
        expect(m.y).toBe(3.0);
        expect(mocHandlers.someHandler).toHaveBeenCalled();
    });
});