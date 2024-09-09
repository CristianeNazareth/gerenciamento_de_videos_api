import pool from './db/db.js'

// alterar a tabela no banco de dados:
// ALTER TABLE videos_tb
// ALTER COLUMN id TYPE BIGINT;

const createTableVideos = `
    CREATE TABLE IF NOT EXISTS videos_tb (
      id serial PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      url VARCHAR(255) NOT NULL,
      duration FLOAT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

async function createTable() {
  try {
    const res = await pool.query(createTableVideos);
    console.log('Tabela criada!');
  } catch (err) {
    console.error('Erro ao criar tabela')
} finally {
  await pool.end();
}

}


createTable();




