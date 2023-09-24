module.exports = async(req, res) => {
    let groupID = req.body.id;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("groups");

    const returnGroup = await collection.findOne({"id": groupID});

    res.send(returnGroup);
};