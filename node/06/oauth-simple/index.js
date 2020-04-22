const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const app = new Koa();
const axios = require('axios')
const querystring = require('querystring')

app.use(static(__dirname+'/'))
const config = {
    client_id: 'f8d7895e7858a52aaecd',
    client_secret: '441850a5e1446eb33061bf70bc0f1139acbfb979'
}
router.get('/github/login',async(ctx)=>{
        //重定向到认证接口,并配置参数
        var path = "https://github.com/login/oauth/authorize";
        path += '?client_id=' + config.client_id;

        ctx.redirect(path)
})

router.get('/github/callback',async (ctx)=>{
    const code = ctx.query.code;
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }
    let res=await axios.post('https://github.com/login/oauth/access_token',params)

    const access_token = querystring.parse(res.data).access_token
    res = await axios.get('https://api.github.com/user?access_token=' + access_token)
    ctx.body=`<div>name:${res.data.login}</div><img src='${avatar_url}'/>`
})

app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000);