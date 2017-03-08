import os from 'os'

const PREVIEW_HOSTNAME = 'strategic-manhattan-preview01.gz01'
const ALLOW_ENV = ['development', 'test', 'preview', 'production']

/**
 * 根据业务情况，初始化Nodejs进程的执行环境
 * 开发环境下，env为空的话，那么就显示指定其为development
 * 上线系统当前不支持预览环境传递环境变量
 * 所以预览机器当前也是按照生产的方式设置为production，但是为了区分preview，故设置为pewview
 * 其余测试环境和线上环境均会显式指定
 * 注意：不接受非开发、测试、预览、生产四个环境的
 */
function init () {
  let env = process.env.NODE_ENV
  if (env === 'production') return

  const envs = new Set(ALLOW_ENV)
  if (env && !envs.has(env)) {
    throw new Error('Please use valid env.')
  }
  if (!env) {
    process.env.NODE_ENV = 'development'
  }
  if (os.hostname() === PREVIEW_HOSTNAME) {
    process.env.NODE_ENV = 'preview'
  }
}

/**
 * 根据具体的业务情况，获得当前Nodejs进程的执行环境
 */
function get () {
  let env = process.env.NODE_ENV
  if (!env) {
    env = 'development'
  }
  if (os.hostname() === PREVIEW_HOSTNAME) {
    env = 'preview'
  }
  return env
}

/**
 * 设置环境变量，限定在4类常规环境中
 */
function set (env) {
  const envs = new Set(ALLOW_ENV)
  if (env && envs.has(env)) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV = env
    } else {
      throw new Error('Production env can not modify.')
    }
  } else {
    throw new Error('Invalid params.')
  }
}

export default {
  init, 
  get,
  set,
}