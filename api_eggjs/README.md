# api 服务

- redis 缓存
- proxy 反向代理

## 组件

- https://github.com/eggjs/egg-http-proxy
- https://github.com/eggjs/egg-redis

## 镜像

```
docker build -t itcast/news-api-node .
```

## 环境变量

```
STRAPI_HOST_PATH            api 地址，默认 http://127.0.0.1:1337/graphql
REDIS_IP                    Rredis IP
```
