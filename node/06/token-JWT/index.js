const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");

const secret = "it's a secret";
app.use(bodyParser())
app.use(static(__dirname + '/'));

router.post('/login',async (ctx)=>{
    const { body } = ctx.request;
    const userinfo = body.username;
    ctx.body={
        message:'',
        user:userinfo,
        token:jwt.sign({
            data:userinfo,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        secret),
      
    }
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000)

