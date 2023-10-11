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

    // describe("test POST /api/groups/channel/create", () => {
    //     it("Should create a new channel in the given group, and return successful", (done) => {
    //         chai.request(app).post("/api/groups/channel/create")
    //         .send({name: "New Test Channel", groupID: 5}).end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             assert.equal(res.body.successful, true);
    //             done();
    //         })
    //     })

    //     it("Should create a second new channel in the same group to test delete later", (done) => {
    //         chai.request(app).post("/api/groups/channel/create")
    //         .send({name: "New Test Channel 2", groupID: 5}).end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             assert.equal(res.body.successful, true);
    //             done();
    //         })
    //     })
    // })

    // describe("test POST /api/groups/channel/delete", () => {
    //     it("Should delete channel from group, and return successful", (done) => {
    //         chai.request(app).post("/api/groups/channel/delete")
    //         .send({groupID: 5, channel: "New Test Channel 2"}).end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             assert.equal(res.body.successful, true);
    //             done();
    //         })
    //     })
    // })

    describe("test GET /api/user/list", () => {
        it("Should return a list of all Group Admins and Users IDs. Sorted in their respective arrays", (done) => {
            chai.request(app).get("/api/user/list")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("GA");
                res.body.should.have.property("US");
                done();
            })
        })
    })

    // describe("test POST /api/user/promote", () => {
    //     it("Should add GA role to user", (done) => {
    //         chai.request(app).post("/api/user/promote")
    //         .send({userID: 6, rank: "GA"}).end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             assert.equal(res.body.successful, true);
    //             done();
    //         })
    //     })

    //     it("Should add SA role to user", (done) => {
    //         chai.request(app).post("/api/user/promote")
    //         .send({userID: 2, rank: "SA"}).end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             assert.equal(res.body.successful, true);
    //             done();
    //         })
    //     })
    // })

    // describe("test POST /api/user/demote", () => {
    //     it("Should demote the Group Admin back to a user", (done) => {
    //         chai.request(app).post("/api/user/demote")
    //         .send({userID: 6}).end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a("object");
    //             assert.equal(res.body.successful, true);
    //             done();
    //         })
    //     })
    // })

    describe("test POST /api/groups/getusers", () => {
        it("Should get all the users in the group, and not in group", (done) => {
            chai.request(app).post("/api/groups/getusers")
            .send({groupID: 1}).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("in");
                res.body.should.have.property("out");
                done();
            })
        })
    })

    
    describe("test POST /api/groups/adduser", () => {
        it("Should add a user to the group", (done) => {
            chai.request(app).post("/api/groups/adduser")
            .send({username: "tay_la", groupID: 2}).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                assert.equal(res.body.successful, true);
                done();
            })
        })
    })

    describe("test POST /api/groups/removeuser", () => {
        it("Should remove the user from the group", (done) => {
            chai.request(app).post("/api/groups/removeuser")
            .send({username: "tay_la", groupID: 2}).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                assert.equal(res.body.successful, true);
                done();
            })
        })
    })
})