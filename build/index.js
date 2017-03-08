'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ENVS = ['development', 'test', 'preview', 'production'];

/**
 * 环境配置
 */
function EnvConf(baseDir) {

  if (!baseDir || !_fs2.default.existsSync(baseDir)) {
    throw new Error('Must have config base dir.');
  }

  /**
   * 初始化环境变量，同时检测环境对应的配置文件夹是否存在，若不存在则创建
   */
  this.init = function () {
    if (!process.env.NODE_ENV) {
      _env2.default.init();
    }

    var dir = '';
    ENVS.forEach(function (val) {
      dir = _path2.default.join(baseDir, val);

      if (!_fs2.default.existsSync(dir)) {
        _fs2.default.mkdir(dir, '0755', function (err) {
          throw err;
        });
      }
    });
  };

  /**
   * 加载配置文件
   */
  this._load = function (file) {
    if (!file) return;

    var absPath = _path2.default.join(baseDir, _env2.default.get(), file);
    try {
      return require(absPath);
    } catch (err) {
      throw err;
    }
  };

  global.$loadConf = this._load;
}

module.exports = {
  env: _env2.default,
  EnvConf: EnvConf
};