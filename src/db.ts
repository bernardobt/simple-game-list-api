import { Pool } from 'pg';
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: Number(process.env.POSTGRES_DBPORT),
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: true,
});


export const fetchGames = async () => {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT id, name_jp, name_en, platform, status FROM games'); 
        return res.rows; 
    } finally {
        client.release(); 
    }
};

export const fetchBooks = async () => {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT id, name_jp, name_en, platform, status FROM books'); 
        return res.rows; 
    } finally {
        client.release(); 
    }
};
