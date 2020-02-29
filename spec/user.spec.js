import User from "../user"

describe("User class", function () {
    var u = null;

    beforeEach(function () {
        u = new User();
    });
    it("updates display position when told to", function () {
        u.moveTo(1.0, 1.0);
        u.updateDisplayPosition();
        expect(u.worldX).toBe(1.0);
        expect(u.worldY).toBe(1.0);
    });
});