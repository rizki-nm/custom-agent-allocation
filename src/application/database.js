import pkg from 'pg';
const { Pool } = pkg;

export const db = new Pool({
    user: 'rizki',
    host: 'localhost',
    database: 'latihan_caa',
    password: 'rizki',
    port: 5432,
})