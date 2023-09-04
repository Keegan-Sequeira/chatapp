const fs = require("fs");

module.exports = function(req, res){
    let groupID = req.body.id;
    let returnGroup;

    fs.readFile("./data/groups.json", "utf8", function(err, data){
        let groups = JSON.parse(data);

        for (let group of groups){
            if (group.id == groupID){
                returnGroup = group;
                break;
            }
        }
        res.send(returnGroup);
    })
};