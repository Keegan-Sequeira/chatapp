const fs = require("fs");

module.exports = function(req, res){
    let id = req.body.id;
    let response;

    fs.readFile("./data/users.json", "utf8", function(err, data){
        let users = JSON.parse(data);

        for (let user of users){
            if (user.id == id){
                response = {
                    valid: true,
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    groups: user.groups,
                    roles: user.roles
                };
                break;
            }
        }

        res.send(response);
    });
};