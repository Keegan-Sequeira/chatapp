module.exports = async(req, res) => {
    let id = req.body.id;
    let response;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("users");

    const user = await collection.findOne({"id": parseInt(id)});

    response = {
        valid: true,
        username: user.username,
        email: user.email,
        id: user.id,
        groups: user.groups,
        roles: user.roles
    };

    res.send(response);
};