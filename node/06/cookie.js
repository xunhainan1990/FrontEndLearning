const http=require('http')

const app=http.createServer((req,res)=>{
    if(req.url==='/favicon.ico')
    { 
        return
    }
   
    else{
        // if(req.headers.cookie)
        // {
            res.setHeader('Set-Cookie','cookie1=123')
            console.log(req.headers.cookie)
            res.end('hello')
        // }
        // else{
          
        // }

    }
}).listen(3000)