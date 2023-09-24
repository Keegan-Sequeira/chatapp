module.exports = async (req, res) => {

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("users");

    const users = await collection.find().toArray();

    let GA = [];
    let US = [];

    for (let user of users){
        if (user.roles[0] == "GA"){
            GA.push({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.roles[0]
            });
        } else if (user.roles[0] == "US") {
            US.push({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.roles[0]
            });
        }
    }

    let response = {
        "GA": GA,
        "US": US
    };

    res.send(response);
}