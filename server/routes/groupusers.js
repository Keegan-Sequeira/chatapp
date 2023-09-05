const fs = require("fs");

module.exports = function(req, res){
    let groupID = req.body.groupID;

    fs.readFile("./data/users.json", "utf8", function(err, data){
        let users = JSON.parse(data);

        let inGroup = [];
        let notGroup = [];

        for (let user of users){
            if (user.groups.includes(groupID) && user.roles[0] != "SA"){
                inGroup.push(user.username);
            } else if (user.roles[0] != "SA"){
                notGroup.push(user.username);
            }
        }

        res.send({in: inGroup, out: notGroup});
    });
}