const fs = require("fs");

module.exports = function(req, res){
    let groups = req.body.groups;
    let returnGroups = [];

    fs.readFile("./data/groups.json", "utf8", function(err, data){
        let groupData = JSON.parse(data);

        for (let group of groupData){
            if (groups.includes(group.id)){
                returnGroups.push(group);
            }
        }
        res.send({groups: returnGroups});
    });
};
