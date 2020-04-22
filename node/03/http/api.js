const http=require('http')
const fs=require('fs')
const app=http.createServer((req,res)=>{
    const {method,url} =req;
    console.log('Cookie'+req.headers.cookie)
    if(method==='GET' &&url==='/'){
        fs.readFile('./index.html',(err,data)=>{
            res.setHeader('Content-Type','text/html')
            res.end(data)
        })
    }
    else if((method==='GET'||method==='POST')&&url==='/api/users'){
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Set-Cookie','cookie=va111')       

        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')

        res.end(JSON.stringify([{name:'tome',age:20}]))
    }
    else if(method=='OPTIONS'&&url=='/api/users'){
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.writeHead(200,{
            'Access-Control-Allow-Origin':'http://localhost:3000',
            'Access-Control-Allow-Headers':'X-Token,Content-Type',
            'Access-Control-Allow-Methods':'PUT'
        })
        res.end()
    }
})
module.exports=app
// app.listen(3000)