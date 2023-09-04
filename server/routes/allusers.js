const fs = require("fs");

module.exports = function(req, res){
    fs.readFile("./data/users.json", "utf8", function(err, data){
        let users = JSON.parse(data);
        let GA = [];
        let US = [];

        for (let user of users){
            if (user.roles[0] == "GA"){
                GA.push({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.roles[0]
                });
            } else if (user.roles[0] == "US") {
                US.push({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.roles[0]
                });
            }
        }

        let response = {
            "GA": GA,
            "US": US
        };

        res.send(response);
    });
}