import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",          // 👈 tu usuario
  host: "localhost",
  database: "pg_trgm",      // 👈 tu base de datos
  password: "Conect890",         // 👈 tu contraseña
  port: 5432,
});

export default pool;