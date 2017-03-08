# Introduce

Expressjs 本身缺乏一个根据不同的环境来加载对应的配置文件的机制，这会导致很多配置都写在同一个文件下通过env来区分，会出现大量

```
const env = process.env.NODE_ENV || 'development'
const config = {
  production: {
    sms: 'http://xx.xx.158.59:8000/jet/textmessage',
    vehicleInfo: 'http://cx.ins.xiaojukeji.com/quote/queryVehicleInfoForAppointment.json',
  },
  development: {
    sms: 'http://xx.xx.100.63:8010/jet/textmessage',
    vehicleInfo: 'http://xx.xx.96.131:8002/quote/queryVehicleInfoForAppointment.json',
  },
  preview: { 
  },
}
export default config[env]
```
配置多了，就不方便管理且影响代码的简洁，整体的思路类似PHP的CI框架。


# Install

```
npm install expressjs-env-conf -S
```

# Using

> 在我们的场景下，需要手工在config文件夹下创建`development`， `production`， `test`, `preview` 四个文件夹代表不同的环境配置存储位置。

因为我们在研发时候就执行的是output下的代码，所以会在`output/config`下检测是否有以上4个文件夹，若没有则会创建。

然后我们在程序启动的入口处执行，

```
import { EnvConf } from 'mfe-node-env-conf'
new EnvConf(config.root).init()
```

其中`config.root`为配置文件的基础目录，执行完之后，就可以在全局使用`$locaConf()`方法


比如在某个`Controller`下

```
const testConf = $loadConf('test.js')
console.log(testConf)
```

该test.js存储于`development`，`test`等环境变量对应的文件夹下。

# API

所有能导出的对象

```
import { env, EnvConf } from 'Nodejs-env-conf'
```

## new EnvConf(configBaseDir)

> 创建EnvConf实例

## instance.init()

> 初始化环境配置，执行完之后，

1. 会在config的基础目录下创建四个文件夹`developmen, test, preview, production`
2. 会在全局对象下附加`$loadConf`方法，这样在任何地方都可以通过`$loadConf`加载配置。

## env.get()

获取`process.env.NODE_ENV`

## env.init()

> 初始化`process.env.NODE_ENV`，在当前的体系下，比如发布预览环境，没有地方设置参数为preview，这个地方根据特定的情况，进行相关初始化，具体参考

```
function init () {
  let env = process.env.NODE_ENV
  const envs = new Set(ALLOW_ENV)

  if (env && !envs.has(env)) {
    return process.exit(`Env is invalid.`)
  }
  if (!env) {
    process.env.NODE_ENV = 'development'
  }
  if (os.hostname() === PREVIEW_HOSTNAME) {
    process.env.NODE_ENV = 'preview'
  }
}
```
## env.set()

设置`process.env.NODE_ENV`，但是有一些约束条件。

# Build

```
npm run build
```

# 设置eslint忽略global

```
"globals": {
  "$loadConf": true
}
```

# 发版说明


## 1.0.0

修复如果baseDir不存在的情况下，程序报的BUG

## 1.0.0

First commit
