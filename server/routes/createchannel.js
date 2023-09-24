module.exports = async(req, res) => {
    let name = req.body.name;
    let group = req.body.groupID;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("groups");

    const result = await collection.updateOne({"id": group}, {"$push": {"channels": name}});

    if (result.acknowledged == true)
    {
        res.send({successful: true});
    } else {
        res.send({successful: false});
    }
};