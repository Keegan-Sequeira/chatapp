const fs = require("fs");

module.exports = function(req, res){
    let name = req.body.name;

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
                res.send({successful: true});
            }
        });
    });
};