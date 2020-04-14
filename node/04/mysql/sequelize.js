(async()=>{
    const Sequelize=require('sequelize')

    const sequelize=new Sequelize('kaikeba','root','banban456',{
        host:'localhost',
        dialect:'mysql',
    })


    const Fruit=sequelize.define('Fruit',{
        id:{
            type:Sequelize.DataTypes.UUID,
            defaultValue:Sequelize.DataTypes.UUIDV1,
            primaryKey:true
        },
        name:{
            type:Sequelize.DataTypes.STRING(20),
            allowNull:false,
            get(){
                const name=this.getDataValue('name')
                const price=this.getDataValue('price')
                const stock=this.getDataValue('stock')
                return `!!!!${name} 价格${price}  库存${stock}!!!`
            }
        },
        price:{
            type:Sequelize.DataTypes.FLOAT,
            allowNull:false,
            validate:{
                isFloat:{msg:'请输入数字'},
                min:{args:[0],msg:'必须大于0'}
            },
        },
        stock:{
            type:Sequelize.DataTypes.INTEGER,
            defaultValue:0

        }
    },

    {
        timestamps:false,
        tableName:'Table_FRUIT',
        getterMethods:{
            amount(){
                return this.getDataValue('stock'+'kg')
            }
        },
setterMethods:{
    amount(val){
        const idx=val.indexOf('kg')
        const v=val.slice(0,idx)
        this.setDataValue('stock',v)
    }
}
    }
    )

    Fruit.classify=function(name){
        const topicFruits=['香蕉','芒果','椰子']
        return topicFruits.includes(name)?'热带水果':'其他水果'
    }

    Fruit.prototype.totalPrice=function(count){
        return (this.price*count).toFixed(2)
    }
    let ret=await Fruit.sync({force:false})

    ret=Fruit.create({
        name:'香蕉',
        price:3.5
    })

    ret=await Fruit.update({price:4},{
        where:{name:'香蕉'}
    })

    ret=await Fruit.findAll()

    Fruit.findAll().then(fruits=>{
        const[f1]=fruits;
        console.log(`买5kg${f1.name}需要${f1.totalPrice(5)}`)
    })

    Fruit.findOne({where:{name:'香蕉'}}).then(fruit=>{
        console.log(fruit.get())
    })

    ret=await Fruit.findAll({
        offset:3,
        limit:3
    })
    console.log(ret)

    //操作符
    const op=Sequelize.Op

    Fruit.findAll({
        where:{id:{[op.lt]:4,[op.gt]:2}}
    }).then(fruits=>{
        console.log(JSON.stringify(fruits))
        console.log(fruits.length)
    })
})()