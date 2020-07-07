/* eslint valid-jsdoc: "off" */

'use strict';

const process = require('process');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583983233667_8682';

  // cluster
  config.cluster = {
    listen: {
      port: 7001,
    },
  };

  // csrf
  config.security = {
    csrf: {
      ignore: () => true,
    },
  };

  // add your middleware config here
  config.middleware = [
    // 'strapi'
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // bodyParser
  config.bodyParser = {
    enable: true,
    jsonLimit: '10mb',
  };

  // strapi 代理
  config.strapi = {
    host: process.env.STRAPI_HOST_PATH || 'http://127.0.0.1:1337/graphql',
    ttl: 60 * 60, // 过期 单位秒 60 * 60 * 24 一天
  };

  // redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: process.env.REDIS_IP || '127.0.0.1', // Redis host
      password: null,
      db: 0,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
