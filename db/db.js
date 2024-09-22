
import pkg from 'pg';
const { Pool } = pkg;

// const pool = new Pool({
//   user: 'nazareth',
//   host: 'localhost',
//   database: 'videos_db',
//   password: '241087',
//   port: 5432,
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Erro ao fazer a conexão:', err.stack);
//   }
//   console.log('Conexão concluído');

//   release();
// });


// export default pool;






// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Erro ao fazer a conexão:', err.stack);
//   }
//   console.log('Conexão concluída');

//   release();
// });

// export default pool;



// import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://nazareth:241087@localhost:5432/videos_db',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao fazer a conexão:', err.stack);
  }
  console.log('Conexão concluída');

  release();
});

export default pool;


