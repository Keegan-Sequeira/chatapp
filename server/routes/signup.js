const fs = require("fs");

module.exports = function(req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    fs.readFile("./data/users.json", "utf8", function(err, data){
        let existingJSON = JSON.parse(data);

        let userID = existingJSON.length;
        
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
                console.log(err);
                res.send({successful: false});
            } else {
                res.send({successful: true});
            }
        });
    });
}