const AWS = require("aws-sdk");
const sharp = require("sharp");

const s3 = new AWS.S3();

exports.handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    
    try {
        const params = { Bucket: bucket, Key: key };
        const image = await s3.getObject(params).promise();

        const metadata = await sharp(image.Body).metadata();

        console.log("Image Metadata:", metadata);

        
        const metadataKey = `metadata/${key}.json`;
        await s3.putObject({
            Bucket: bucket,
            Key: metadataKey,
            Body: JSON.stringify(metadata, null, 2),
            ContentType: "application/json"
        }).promise();

        return {
            statusCode: 200,
            body: `Metadata extracted and stored at ${metadataKey}`
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: "Error processing image"
        };
    }
};
