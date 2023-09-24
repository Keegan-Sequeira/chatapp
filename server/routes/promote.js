module.exports = async(req, res) => {
    let promoted = req.body.userID;
    let rank = req.body.rank;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("users");

    const result = await collection.updateOne({"id": parseInt(promoted)}, {"$push": {"roles": {"$each": [rank], "$position": 0}}});

    if (result.acknowledged == true)  {
        res.send({successful: true});
    } else {
        res.send({successful: false});
    }
};