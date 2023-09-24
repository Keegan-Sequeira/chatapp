module.exports = async(req, res) => {
    let groupID = req.body.groupID;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("users");

    const users = await collection.find({}).toArray();

    let inGroup = [];
    let notGroup = [];

    for (let user of users){
        if (user.groups.includes(groupID) && user.roles[0] != "SA"){
            inGroup.push(user.username);
        } else if (user.roles[0] != "SA"){
            notGroup.push(user.username);
        }
    }

    res.send({in: inGroup, out: notGroup});

}