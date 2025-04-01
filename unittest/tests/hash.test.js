const hashpassword = require("../testing");

describe("testing the hashed password", function() {
    it("should hash a password correctly", function() {
        const password = "abcdefghijklmnopqrstuvwxyz";
        const hashed = hashpassword(password);
        expect(hashed).not.toBe(password);
    });
});
