const fs = require("fs");

module.exports = function(req, res){
    let name = req.body.name;
    let group = req.body.groupID;

    fs.readFile("./data/groups.json", "utf8", function(err, data){
        let existingJson = JSON.parse(data);
        existingJson[group-1].channels.push(name);
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