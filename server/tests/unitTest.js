let assert = require("assert");
let app = require("../server.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);

describe("Test Server Routes", function() {
    before(function (done) {
        app.on("ready", function() {
            done();
        })
    })

    describe("test POST /api/auth/login with incorrect login", () => {
        it("Should reject the login and return valid: false", (done) => {
            chai.request(app).post("/api/auth/login").type("form")
            .send({
                username: "super",
                password: "321"
            })
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(res.body.valid, false);
                done();
            })
        })
    })
})