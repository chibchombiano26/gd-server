"use strict";
var AWS = require('aws-sdk');
var fs = require("fs");
var Storage = (function () {
    function Storage() {
    }
    Storage.prototype.saveFile = function (file) {
        AWS.config.update({
            accessKeyId: process.env.awskey,
            secretAccessKey: process.env.awssecretkey
        });
        console.log(AWS);
        var promise = new Promise(function (resolve, reject) {
            var s3 = new AWS.S3();
            s3.upload({
                Key: file.originalFilename,
                Bucket: "hefesoft-storage",
                ACL: "public-read",
                Body: fs.createReadStream(file.path)
            }, function (err, output) {
                if (err) {
                    console.log(err);
                    throw (err);
                }
                console.log("Finished uploading:", output.Location);
                resolve(output.Location);
            });
        });
        return promise;
    };
    return Storage;
}());
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map