module.exports = async(req, res) => {
    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("users");

    const user = await collection.find({}).toArray();
    res.send(user);
}