(async()=>{
const Sequelize=require('sequelize')

const sequelize=new Sequelize('kaikeba','root','banban456',{
    host:'localhost',
    dialect:'mysql',
})

const Player=sequelize.define('player',{name:Sequelize.STRING})
const Team=sequelize.define('team',{name:Sequelize.STRING})


//1:N的关系
Player.belongsTo(Team)
Team.hasMany(Player)

sequelize.sync({force:true}).then(async()=>{
    await Team.create({name:'火箭'})
    await Player.bulkCreate([{name:'哈登',teamId:1},{name:'保罗',teamId:1}])

    const players=await Player.findAll({include:[Team]})
    console.log(JSON.stringify(players))

    const team=await Team.findOne({where:{name:'火箭'},include:[Player]})
    console.log(JSON.stringify(team))
})
})()