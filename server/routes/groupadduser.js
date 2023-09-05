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

        existingUser.groups.push(groupID);

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