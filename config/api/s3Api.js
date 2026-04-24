const { S3Client } = require('@aws-sdk/client-s3');

const region = (process.env.RUNPOD_REGION || '').toLowerCase();

const s3Api = new S3Client({
  region,
  endpoint: `https://s3api-${region}.runpod.io`,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

module.exports = s3Api;
