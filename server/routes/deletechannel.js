module.exports = async(req, res) => {
    let groupID = req.body.groupID;
    let channel = req.body.channel;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("groups");

    const result = await collection.updateOne({"id": groupID}, {"$pull": {"channels": channel}});

    
    if (result.acknowledged == true)
    {
        res.send({successful: true});
    } else {
        res.send({successful: false});
    }
};