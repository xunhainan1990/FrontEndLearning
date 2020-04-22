const http=require('http')
const session = {}
const app=http.createServer((req,res)=>{
    const sessionKey = 'sid'
if(req.url==='/favicon.ico'){
    return
}
else{
    const cookie=req.headers.cookie
    if(cookie&&cookie.indexOf(sessionKey)>-1){
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session:', sid, session, session[sid])
        res.end(session[sid])
    }
    else{
        const sid=(Math.random()*9999).toFixed()
        res.setHeader('Set-Cookie',`${sessionKey}=${sid}`)
        session[sid]='this is session'
        res.end('set')
        
    }
}
}).listen(3000)