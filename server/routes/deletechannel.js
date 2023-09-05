const fs = require("fs");

module.exports = function(req, res){
    let groupID = req.body.groupID;
    let channel = req.body.channel;

    fs.readFile("./data/groups.json", "utf8", function(err, data){
        let existingJson = JSON.parse(data);
        let updateChannels = existingJson[groupID-1].channels;
        let removeIndex;

        for (let i = 0; i < updateChannels.length; i++){
            if (updateChannels[i] == channel){
                removeIndex = i;
                break;
            }
        }
        updateChannels.splice(removeIndex, 1);
        existingJson[groupID-1].channels = updateChannels;

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