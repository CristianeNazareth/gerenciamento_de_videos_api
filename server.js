import express from "express";
import pool from "./db/db.js";
import cors from "cors";

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

// let videos = []

app.post("/videos", async (req, res) => {
  const { title, url, duration } = req.body;
  // res.send('Post concluido')
  const videoId = Date.now() + Math.floor(Math.random() * 1000);

  try {
    const query = `
      INSERT INTO videos_tb (id, title, url, duration) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [videoId, title, url, duration];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao inserir vídeo no banco de dados:", err);
    res.status(500).send("Erro ao salvar vídeo no banco de dados");
  }
});

app.get("/videos", async (req, res) => {
  // res.send('servidor rodando')
  // res.json(videos)
  try {
    const result = await pool.query("SELECT * FROM videos_TB");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro na busca ao banco de dados:", err);
    res.status(500).send("Erro ao buscar videos.");
  }
});

app.put("/videos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, url, duration } = req.body;

  try {
    const query =
      "UPDATE videos_tb SET title = $1, url = $2, duration = $3 WHERE  id = $4 RETURNING *";
    const values = [title, url, duration, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vídeo não encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar video:", err);
    res.status(500).send("Erro na atualização");
  }
});

app.delete("/videos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM videos_tb WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Video não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Erro ao excluir video:", err);
    res.status(500).send("Erero ao exclir video.");
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
