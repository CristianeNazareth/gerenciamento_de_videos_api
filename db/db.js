
import pkg from 'pg';
const { Pool } = pkg;

// import { Pool } from 'pg';

const pool = new Pool({
  user: 'nazareth',
  host: 'localhost',
  database: 'videos_db',
  password: '241087',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao fazer a conexão:', err.stack);
  }
  console.log('Conexão concluído');
  release();
});


export default pool;
