var AWS = require('aws-sdk');
var fs = require("fs");

export class Storage {

    constructor() {
        AWS.config.update({
            accessKeyId: process.env.awskey,
            secretAccessKey: process.env.awssecretkey
        });

        //Keys
        try{
        console.log(process.env.awskey, process.env.awssecretkey);
        }
        catch(e){}
    }

    saveFile(file):Promise<any> {
        let promise = new Promise((resolve, reject) => {
            const s3 = new AWS.S3();
            s3.upload({
                Key: file.originalFilename,
                Bucket: "hefesoft-storage",
                ACL: "public-read",
                Body: fs.createReadStream(file.path)
            }, function(err, output) {

                if(err){
                    console.log(err);
                    throw(err);
                }

                console.log("Finished uploading:", output.Location);
                resolve(output.Location);
            });
        });

        return promise;
    }

}