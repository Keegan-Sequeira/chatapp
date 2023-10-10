module.exports = async(req, res) => {
    let groups = req.body.groups;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("groups");

    const returnGroups = await collection.find({"id": {"$in": groups}}).toArray();
    
    res.send({groups: returnGroups});
};
