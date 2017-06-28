const ENVS = ["development", "test", "preview", "production"]

/**
 * 根据业务情况，初始化Nodejs进程的执行环境
 * 开发环境下，env为空的话，那么就显示指定其为development
 * 注意：不接受非开发、测试、预览、生产四个环境的
 */
function init() {
    let env = process.env.NODE_ENV

    if (!new Set(ENVS).has(env)) {
        throw new Error("Please use valid env.")
    }
    if (!env) {
        process.env.NODE_ENV = "development"
    }
}

/**
 * 根据具体的业务情况，获得当前Nodejs进程的执行环境
 */
function get() {
    return process.env.NODE_ENV || 'development'
}

/**
 * 设置环境变量，限定在4类常规环境中
 */
function set(env) {
    if (!env || !new Set(ENVS).has(env)) {
        throw new Error("Invalid params.")
    }
    if (process.env.NODE_ENV === "production") {
        throw new Error("Production env can not modify.")
    }
    process.env.NODE_ENV = env
}

export default {
    init,
    get,
    set,
}