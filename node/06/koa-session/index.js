const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')

const app = new Koa();


app.use(cors({
    credentials:true
}))

app.keys=['some secret']
app.use(static(__dirname+'/'))

app.use(bodyParser())
app.use(session(app))


app.use((ctx,next)=>{
    if(ctx.url.indexOf('login')>-1){
        next()
    }
    else{
        const userInfo=ctx.session.userInfo
        if(userInfo){
            next()
        }
        else{
            ctx.body='faled to login'
        }
    }
})

router.post('/login',async (ctx)=>{
    const {body}=ctx.request
    ctx.session.userInfo=body.userName
    ctx.body='login success'
})

router.post('/logout',async (ctx)=>{
   delete ctx.session.userInfo
   ctx.body='logout success'
})

router.get('/getUser',async (ctx)=>{
   ctx.body={
       message:'getUser success',
       userInfo:ctx.session.userInfo
   }
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
