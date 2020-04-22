const fs=require('fs')
fs.readFile('./download.js',(err,data)=>{
    if(err){
        throw err
    }
    console.log(data.toString());
})