const fs = require("fs");

module.exports = async(req, res) => {
    let name = req.body.name;
    let user = req.body.userId;

    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("groups");

    const topID = await collection.aggregate([
        {
            "$sort": {"id": -1}
        },
        {
            "$limit": 1
        },
        {
            "$project": {
                "_id": 0,
                "id": 1
            }
        }
    ]).toArray();
    const newID = topID[0].id + 1;

    const newGroup = {
        "id": newID,
        "name": name,
        "channels": []
    }
    
    const result = await collection.insertOne(newGroup);

    if (result.acknowledged == true) {
        const userCollection = db.collection("users");
        const updateResult = await userCollection.updateMany({"$or": [{"roles": "SA"}, {"id": parseInt(user)}]}, {"$push": {"groups": newID}});

        if (updateResult.acknowledged == true)
        {
            res.send({successful: true});
        } else {
            res.send({successful: false});
        }
        
    } else {
        res.send({successful: false});
    }
};