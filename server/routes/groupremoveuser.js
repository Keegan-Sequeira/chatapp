module.exports = async(req, res) => {
    let username = req.body.username;
    let groupID = req.body.groupID;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("users");

    const result = await collection.updateOne({"username": username}, {"$pull": {"groups": groupID}});

    if (result.acknowledged == true)
    {
        res.send({successful: true});
    } else {
        res.send({successful: false});
    }
};