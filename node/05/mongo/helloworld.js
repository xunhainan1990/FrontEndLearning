(async ()=>{
    const {MongoClient:MongoDB}=require('mongodb')

    const client=new MongoDB(
        'mongodb://localhost:27017',
        {
            useNewUrlParser:true,
            useUnifiedTopology: true
        }
    )

    let ret
    ret=await client.connect()

    const db=client.db('test')
    const res=db.collection('runoob')
    ret=res.deleteMany
    ()
    ret=await res.insertOne({
        name:'apple',
        price:20
    })

    ret=await res.findOne()

    ret=await res.updateOne({
        name:'apple'},{
            $set:{name:'pie'}
        }
    )
    console.log("insert", JSON.stringify(ret) )
    // Console.log(ret)
})()