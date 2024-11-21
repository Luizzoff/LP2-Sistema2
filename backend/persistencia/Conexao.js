import mysql from 'mysql2/promise';

export default async function conectar(){
    
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        global.poolConexoes = mysql.createPool({
            "host": process.env.HOST,
            "port": process.env.PORTA,
            "database": process.env.DATABASE,
            "user": process.env.USER,
            "password": process.env.PASSWORD,
            "connectionLimit": 20,
            "connectTimeout": 60000,
            "waitForConnections": true,
            "queueLimit": 20
        });
        return await global.poolConexoes.getConnection();
    }
}