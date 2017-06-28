# 简介

`Expressjs` 本身缺乏根据不同的环境来加载对应的配置文件的机制，这会导致很多配置都写在同一个文件下通过env来区分，我们的项目中会出现大量诸如

```
const env = process.env.NODE_ENV || 'development'
const config = {
  production: {
    sms: 'http://xx.xx.158.59:8000/jet/textmessage',
    vehicleInfo: 'http://cx.ins.xiaobeixx.com/quote/queryVehicleInfoForAppointment.json',
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

配置多了，就不方便管理且影响代码的简洁，之前使用过PHP的CI框架，所以就想着能不能在Express体系下也进入该机制。


# 安装

```
npm install expressjs-env-conf -S
```

# 使用

在程序的入口处，一般是`app.js`上引入

```
import { EnvConf } from 'expressjs-env-conf'
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

初始化`process.env.NODE_ENV`

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

# CHANGELOG

## 1.0.2

1. 部分代码重构。

## 1.0.1

修复如果baseDir不存在的情况下，程序报的BUG

## 1.0.0

完成基本功能
