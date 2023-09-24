const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

module.exports = function(req, res){
    var form = new formidable.IncomingForm();
    const uploadFolder = path.join(__dirname, "../uploadedImages");
    form.uploadDir = uploadFolder;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        let oldpath = files.image[0].filepath;
        const type = files.image[0].mimetype.split("/")[1];
        let newpath = files.image[0].filepath + "." + type;

        fs.rename(oldpath, newpath, function(err){
            if (err) {
                console.log("Error parsing file.");
                return res.status(400).json({
                    status: "Fail",
                    message: "There was an error parsing file",
                    error: err
                });

            }
        });

        res.send({
            result: "OK",
            data: {"filename": files.image[0].newFilename + "." + type, "size": files.image[0].size},
            numberOfImages: 1,
            message: "Upload successful"
        });
    })
}