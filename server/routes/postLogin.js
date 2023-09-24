module.exports = async(req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    let valid = false;
    let response;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("users");

    const users = await collection.find({}).toArray();

    for (let user of users) {
        if (username.toLowerCase() == user.username.toLowerCase() && password == user.password) {
            valid = true;
            response = {
                valid: true,
                username: user.username,
                email: user.email,
                id: user.id,
                groups: user.groups,
                roles: user.roles
            };
            break;
        }
    }

    if (valid == true) {
        res.send(response);
    } else {
        res.send({valid: false});
    }

}