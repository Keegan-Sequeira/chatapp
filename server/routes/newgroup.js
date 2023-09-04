const fs = require("fs");

function addToUsers(user, newId){
    fs.readFile("./data/users.json", "utf8", function(err, data){
        let existingJson = JSON.parse(data);

        existingJson[0].groups.push(newId);

        for (let i of existingJson){
            if (i.id == user) {
                i.groups.push(newId);
            }
        }

        let jsonString = JSON.stringify(existingJson);

        fs.writeFile("./data/users.json", jsonString, function(err, data){
            console.log("Added group to users");
        })
    });
};

module.exports = function(req, res){
    let name = req.body.name;
    let user = req.body.userId;

    fs.readFile("./data/groups.json", "utf8", function(err, data){
        let existingJson = JSON.parse(data);

        let groupId = existingJson.length + 1;

        let newGroup = {
            "id": groupId,
            "name": name,
            "channels": []
        };

        existingJson.push(newGroup);

        let jsonString = JSON.stringify(existingJson);

        fs.writeFile("./data/groups.json", jsonString, err => {
            if (err){
                console.log(err);
                res.send({successful: false});
            } else {
                addToUsers(user, groupId);
                res.send({successful: true});
            }
        });
    });
};