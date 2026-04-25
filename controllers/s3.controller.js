const s3Service = require('../services/s3/service');
const { asyncHandler } = require('../middlewares');

exports.list = asyncHandler(async (req, res) => {
  const { prefix = '' } = req.query;
  const result = await s3Service.list(prefix);
  res.json(result);
});

exports.download = asyncHandler(async (req, res) => {
  const { key } = req.query;
  const result = await s3Service.download(key);
  res.setHeader('Content-Type', result.ContentType || 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${key.split('/').pop()}"`);
  result.Body.pipe(res);
});

exports.upload = asyncHandler(async (req, res) => {
  const { key } = req.body;
  const result = await s3Service.upload(key, req.file.buffer, req.file.mimetype);
  res.json(result);
});

exports.delete = asyncHandler(async (req, res) => {
  const { key } = req.body;
  await s3Service.delete(key);
  res.json({ success: true });
});
