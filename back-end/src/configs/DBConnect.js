import mysql from 'mysql2/promise';

// Create a single connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'quanlynhatro',
    dateStrings: true,
    waitForConnections: true,
    connectionLimit: 20,
    maxIdle: 20,
    idleTimeout: 20000,
    queueLimit: 40,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});


export default pool;


