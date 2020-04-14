(async()=>{
const Sequelize=require('sequelize')

const sequelize=new Sequelize('kaikeba','root','banban456',{
    host:'localhost',
    dialect:'mysql'
})

const Fruit= sequelize.define("fruit",{name:Sequelize.STRING})
const Category =sequelize.define('category',{name:Sequelize.STRING})
Fruit.FruitCategory=Fruit.belongsToMany(Category,{
    through:'FruitCategory'
})

sequelize.sync({force:true}).then(async()=>{
    await Fruit.create(
        {
            name: "香蕉",
            categories: [{ id: 1, name: "热带" }, { id: 2, name: "温带" }]
        },
        {
            include: [Fruit.FruitCategory]
        }
    )

    const fruit =await Fruit.findOne({
        where:{name:'香蕉'},
        include:[{model:Category,through:{attributes:['id','name']}}]
    })
})
})()