import { createServer } from 'http';

import express from 'express';
import pool from './db/db.js';

const app = express();
const port = 3333;

app.use(express.json());

const videos = []


app.post('/videos', (req, res) => {

  const { title, url, duration } = req.body;
  // res.send('Post concluido')
  const id = Date.now() + Math.floor(Math.random() * 1000);




  const newVideo = { id, title, url, duration };
  videos.push(newVideo)
  res.json(videos);

});


app.get('/videos', (req, res) => {
  // res.send('servidor rodando')
  res.json(videos)
});


app.put('/videos/:id', (req, res) => {
  const { id } = req.params;

  const { title, url, duration } = req.body;

  const video = videos.find(v => v.id === parseInt(id));
  if(!video) {
    return res.status(404).json({message: 'Video não encontrado'});
  }
  res.json(video)
})


app.delete('/videos/:id', (req, res) => {
  const { id } = req.params;

  const { title, url, duration } = req.body;
  const video = videos.find(v => v.id === parseInt(id));
  if(!video) {
    return res.status(404).json({message: 'Video não encontrado'});
  }

  videos.splice(id, 1)
  res.status(204).send();
})





app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


