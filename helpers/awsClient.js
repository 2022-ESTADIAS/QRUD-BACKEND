const {
  S3Client,
  S3,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_CREDENTIALS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_CREDENTIALS_PRIVATE_KEY,
  },
});

const uploadFileToAWS = async (bucketName, folder, file) => {
  try {
    const filePath = `../uploads/${file.filename}`;
    let fileName = `${folder}/${file.filename}`;

    const stream = fs.createReadStream(path.join(__dirname, filePath));

    const uploadFile = await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: stream,
        ContentType: file.mimetype,
      })
    );

    fs.unlink(filePath, () => {
      console.log("ARCHIVO BORRADO");
    });

    return fileName;
  } catch (error) {
    console.log(error);
    throw new Error("erorr al subir el archivo a aws");
  }
};

const getFileFromAWS = async (bucketName, filename) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: filename,
    });
    const url = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });

    return url;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadFileToAWS,
  getFileFromAWS,
};
