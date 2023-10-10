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

    describe("test POST /api/auth/login", () => {
        it("Testing Invalid - should reject the login and return valid: false", (done) => {
            chai.request(app).post("/api/auth/login").type("form")
            .send({
                username: "super",
                password: "321"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                assert.equal(res.body.valid, false);
                done();
            })
        })

        it("Testing Valid - should accept the login and return an object with the user data", (done) => {
            chai.request(app).post("/api/auth/login").type("form")
            .send({
                username: "super",
                password: "123"
            }).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                assert.equal(res.body.valid, true);
                assert.equal(res.body.username, "super");
                done();
            })
        })
    })

    // describe("test POST /api/signup", () => {
    //     it("Testing Existing Username - should return valid: false", (done) => {
    //         chai.request(app).post("/api/signup").type("form")
    //         .send({
    //             email: "testing@chatlink.com",
    //             username: "super",
    //             password: "Password1"
    //         }).end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             assert.equal(res.body.valid, false);
    //             done();
    //         })
    //     })

    //     it("Testing Valid Signup - should return object with user data", (done) => {
    //         chai.request(app).post("/api/signup").type("form")
    //         .send({
    //             email: "bob.marley@gmail.com",
    //             username: "bob.marley",
    //             password: "Password1"
    //         }).end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             assert.equal(res.body.valid, true);
    //             assert.equal(res.body.username, "bob.marley");
    //             done();
    //         })
    //     })
    // })

    describe("test POST /api/user/info", () => {
        it("Should return an object of user data", (done) => {
            chai.request(app).post("/api/user/info").type("form")
            .send({id: 1}).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                assert.equal(res.body.username, "super");
                assert.equal(res.body.email, "admin@chatlink.com");
                done();
            })
        })
    })

    describe("test POST /api/user/groups", () => {
        it("Should return an array of group objects", (done) => {
            chai.request(app).post("/api/user/groups")
            .send({groups: [1, 2]}).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                assert.equal(res.body.groups[0].name, "Open Group");
                assert.equal(res.body.groups[1].name, "Bob's Private Group");
                done();
            })
        })

        it("Should return empty array if user is in no groups", (done) => {
            chai.request(app).post("/api/user/groups")
            .send({groups: []}).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                assert.equal(res.body.groups.length, 0);
                done();
            })
        })
    })

    // describe("test POST /api/groups/create", () => {
    //     it("Should create a new group, give required access and return successful or not", (done) => {
    //         chai.request(app).post("/api/groups/create")
    //         .send({name: "New Test Group", user: 1}).end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             assert.equal(res.body.successful, true);
    //             done();
    //         })
    //     })
    // })

    describe("test POST /api/groups/info", () => {
        it("Should return an object with group data", (done) => {
            chai.request(app).post("/api/groups/info")
            .send({id: 1}).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                assert.equal(res.body.name, "Open Group");
                done();
            })
        })
    })
})