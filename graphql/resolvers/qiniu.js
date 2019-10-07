const qiniu = require("qiniu");
const config = require("../../config");

module.exports = {
  Query: {
    async uploadToken(_, __) {
      try {
        // * 默认上传凭证有效期 3600s
        const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
        const options = { scope: config.qiniu.bucket };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        return uploadToken;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
