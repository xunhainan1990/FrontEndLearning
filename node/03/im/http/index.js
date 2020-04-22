const express = require('express')
const path=require('path')
const app = express()
const bodyParser = require('body-parser');
let list=['aaa']
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./index.html'))
})

app.get('/list',(req,res)=>{
res.end(JSON.stringify(list))
})

app.post('/send',(req,res)=>{
    list.push(req.body.message)
    res.end(JSON.stringify(list))
})

app.post('/clear',(req,res)=>{
    list=[]
    res.end(JSON.stringify(list))
})

app.listen(3000)