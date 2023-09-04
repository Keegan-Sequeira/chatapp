const fs = require("fs");

module.exports = function(req, res){
    let promoted = req.body.userID;
    let rank = req.body.rank;
    fs.readFile("./data/users.json", "utf8", function(err, data){
        let users = JSON.parse(data);

        users[promoted-1].roles.splice(0, 0, rank);

        let jsonString = JSON.stringify(users);

        fs.writeFile("./data/users.json", jsonString, err => {
            if (err){
                console.log(err);
                res.send({successful: false});
            } else {
                res.send({successful: true});
            }
        });

    });
};