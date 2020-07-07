'use strict';

const Controller = require('egg').Controller;
const shajs = require('sha.js');

class GraphqlController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'ducafecat-news-api';

    try {
      const reqBody = ctx.request.body;
      const key = shajs('sha256')
        .update(ctx.request.href + '|' + JSON.stringify(reqBody))
        .digest('hex');

      let val = await this.app.redis.get(key);
      if (val === undefined || val === null) {
        // hr = await ctx.proxyRequest(options.host);
        const result = await ctx.curl(this.config.strapi.host, {
          method: 'POST',
          contentType: 'json',
          data: reqBody,
          dataType: 'json',
        });
        val = result.data;
        await this.app.redis.set(
          key,
          JSON.stringify(val),
          'ex',
          this.config.strapi.ttl
        );
      }

      ctx.body = val;
      ctx.status = 200;
    } catch (error) {
      ctx.body = error.message || 'error';
      ctx.status = 500;
    }
  }
}

module.exports = GraphqlController;
