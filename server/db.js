const Pool = require("pg").Pool

// const pool = new Pool ({
//     user: "uurmmakgdblokc",
//     password: "2ddd73c0d66508aba443da9cd0360938729254c0a419ec467b2aee4908cd1131",
//     host: "ec2-52-31-233-101.eu-west-1.compute.amazonaws.com",
//     port: 5432,
//     database: "d9nv2noldq5r8m"
// })

const pool = new Pool ({
    connectionString: "postgres://uurmmakgdblokc:2ddd73c0d66508aba443da9cd0360938729254c0a419ec467b2aee4908cd1131@ec2-52-31-233-101.eu-west-1.compute.amazonaws.com:5432/d9nv2noldq5r8m"
})
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})
module.exports = pool