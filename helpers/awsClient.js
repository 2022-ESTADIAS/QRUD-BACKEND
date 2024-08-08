const { S3Client, S3, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();
const fs = require("fs");
const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_CREDENTIALS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_CREDENTIALS_PRIVATE_KEY,
  },
});

const uploadFileToAWS = async (bucketName, file) => {
  try {
    const stream = fs.createReadStream(file.pathName);

    const uploadFile = await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: file.name,
        Body: stream,
      })
    );
    console.log(uploadFile, "archivo subido");
    return uploadFile;
  } catch (error) {
    console.log(error);
    throw new Error("erorr al subir el archivo a aws");
  }
};

module.exports = {
  uploadFileToAWS,
};
