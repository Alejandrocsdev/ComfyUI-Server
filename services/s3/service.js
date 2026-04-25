const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const aws4 = require('aws4');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');
const s3Client = require('../../config/api/s3Api');

const REGION = (process.env.RUNPOD_REGION || '').toLowerCase();
const HOST = `s3api-${REGION}.runpod.io`;
const BUCKET = process.env.RUNPOD_VOLUME_ID;

const sign = (path) =>
  aws4.sign(
    { host: HOST, path, service: 's3', region: REGION, method: 'GET' },
    { accessKeyId: process.env.S3_ACCESS_KEY, secretAccessKey: process.env.S3_SECRET_KEY }
  );

exports.list = async (prefix = '') => {
  const query = [
    'list-type=2',
    prefix && `prefix=${encodeURIComponent(prefix)}`,
    `delimiter=${encodeURIComponent('/')}`,
  ]
    .filter(Boolean)
    .join('&');

  const opts = sign(`/${BUCKET}?${query}`);
  const { data } = await axios.get(`https://${HOST}${opts.path}`, { headers: opts.headers });

  const parser = new XMLParser({ ignoreAttributes: false });
  const result = parser.parse(data).ListBucketResult;

  const files = []
    .concat(result?.Contents || [])
    .filter((item) => item.Key !== prefix)
    .map((item) => ({
      key: item.Key,
      name: item.Key.replace(prefix, ''),
      size: item.Size,
      lastModified: item.LastModified,
    }));

  const folders = []
    .concat(result?.CommonPrefixes || [])
    .map((p) => ({
      key: p.Prefix,
      name: p.Prefix.replace(prefix, '').replace(/\/$/, ''),
    }));

  return { files, folders };
};

exports.download = async (key) => {
  const result = await s3Client.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
  return result;
};

exports.upload = async (key, buffer, contentType) => {
  await s3Client.send(
    new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buffer, ContentType: contentType })
  );
  return { key };
};

exports.delete = async (key) => {
  await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
};
