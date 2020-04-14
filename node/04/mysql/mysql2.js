
(async()=>{
    const mysql2=require('mysql2/promise')

    const config={
        host:'localhost',
        user:'root',
        password:'banban456',
        database:'kaikeba'
    }
    const connection=await mysql2.createConnection(config)

    let ret=await connection.execute(`CREATE TABLE IF NOT EXISTS test(
        id INT NOT NULL AUTO_INCREMENT,
        message VARCHAR(45),
        PRIMARY KEY (id)
    )`)

    console.log('create',ret)

    ret=await connection.execute(`INSERT INTO test(message) VALUE(?)`,['AAA'])
})()