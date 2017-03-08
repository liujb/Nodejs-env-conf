import fs from 'fs'
import path from 'path'
import env from './env'

const ENVS = ['development', 'test', 'preview', 'production']

/**
 * 环境配置
 */
function EnvConf (baseDir) {

  if (!baseDir || !fs.existsSync(baseDir)) {
    throw new Error('Must have config base dir.')
  }

  /**
   * 初始化环境变量，同时检测环境对应的配置文件夹是否存在，若不存在则创建
   */
  this.init = () => {
    if (!process.env.NODE_ENV) {
      env.init()
    }

    let dir = ''
    ENVS.forEach((val) => {
      dir = path.join(baseDir, val)

      if (!fs.existsSync(dir)) {
        fs.mkdir(dir, '0755', (err) => { throw err })
      }

    })
  }

  /**
   * 加载配置文件
   */
  this._load = (file) => {
    if (!file) return

    const absPath = path.join(baseDir, env.get(), file)
    try {
      return require(absPath)
    } catch (err) {
      throw err
    }
  }

  global.$loadConf = this._load
}

module.exports = {
  env,
  EnvConf,
}
