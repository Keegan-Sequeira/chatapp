module.exports = async(req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    
    const mongoClient = req.app.get("mongoClient");
    const db = mongoClient.db("chatapp");
    const collection = db.collection("users");

    const existing = await collection.find({"username": username}).toArray();
    if (existing.length > 0){
        res.send({valid: false});
    } else {
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
        
        let newUser = {
            "id": newID,
            "username": username,
            "password": password,
            "email": email,
            "roles": ["US"],
            "groups": [1]
        }

        let response = {
            valid: true,
            username: newUser.username,
            email: newUser.email,
            id: newUser.id,
            groups: newUser.groups,
            roles: newUser.roles
        };

        const result = await collection.insertOne(newUser);

        if (result.acknowledged == true) {
            res.send(response);
        } else {
            res.send({valid: false});
        }
        
    }
}