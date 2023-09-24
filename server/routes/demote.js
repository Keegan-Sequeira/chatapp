module.exports = async(req, res) => {
    let promoted = req.body.userID;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("users");

    const result = await collection.updateOne({"id": parseInt(promoted)}, {"$pop": {"roles": -1}});

    if (result.acknowledged == true)  {
        res.send({successful: true});
    } else {
        res.send({successful: false});
    }
};