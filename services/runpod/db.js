const { Pod } = require('../../db/mysql/models');

exports.create = async (podId) => {
  return Pod.create({ podId });
};
