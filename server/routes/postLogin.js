var fs = require("fs");

module.exports = function(req, res) {

    let username = req.body.username;
    let password = req.body.password;

    let valid = false;
    let response;

    fs.readFile("./data/users.json", "utf8", function(err, data){
        let users = JSON.parse(data);

        for (let user of users) {
            if (username == user.username && password == user.password) {
                valid = true;
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
    
        if (valid == true) {
            res.send(response);
        } else {
            res.send({valid: false});
        }
    });    
}