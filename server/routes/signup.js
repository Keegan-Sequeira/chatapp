const fs = require("fs");

module.exports = function(req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    fs.readFile("./data/users.json", "utf8", function(err, data){
        let existingJSON = JSON.parse(data);

        // Check username exists
        let existing = false;
        for (let user of existingJSON){
            if (user.username == username){
                existing = true;
                break;
            }
        }

        if (existing == true){
            res.send({valid: false});
        } else {
            let userID = existingJSON.length + 1;
        
            let newUser = {
                "id": userID,
                "username": username,
                "password": password,
                "email": email,
                "roles": ["US"],
                "groups": ["open"]
            };
        
            existingJSON.push(newUser);
        
            let jsonString = JSON.stringify(existingJSON);
    
            fs.writeFile("./data/users.json", jsonString, err => {
                if (err){
                    res.send({successful: false});
                } else {
                    let response = {
                        valid: true,
                        username: newUser.username,
                        email: newUser.email,
                        id: newUser.id,
                        groups: newUser.groups,
                        roles: newUser.roles
                    };
                    res.send(response);
                }
            });
        }
    });
}