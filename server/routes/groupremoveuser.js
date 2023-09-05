const fs = require("fs");

module.exports = function(req, res){
    let username = req.body.username;
    let groupID = req.body.groupID;

    fs.readFile("./data/users.json", "utf8", function(err, data){
        let existingJson = JSON.parse(data);
        let existingUser;
        let removeUser;

        for (let i = 0; i < existingJson.length; i++){
            if (existingJson[i].username == username){
                existingUser = existingJson[i];
                removeUser = i;
                break;
            }
        }

        let removeGroup;
        for (let i = 0; i < existingUser.groups.length; i++){
            if (existingUser.groups[i] == groupID){
                removeGroup = i;
                break;
            }
        }

        existingUser.groups.splice(removeGroup, 1);
        existingJson[removeUser] = existingUser;
        let jsonString = JSON.stringify(existingJson);

        fs.writeFile("./data/users.json", jsonString, err => {
            if (err){
                console.log(err);
                res.send({successful: false});
            } else {
                res.send({successful: true});
            }
        });

        
    });

};