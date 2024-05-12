import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';
// import { title } from 'process';
// import { request } from 'http';


const server = fastify();

const database = new DatabaseMemory()


server.post('/videos', async (request, reply) => {

  const { name, videoUrl, duration } = request.body

  database.create({
    name: name,
    videoUrl: videoUrl,
    duration: duration
  })
  // const { videoUrl } = request.body;

    console.log(database.list())
    return reply.status(201)


try {

    reply.code(201).send({message: 'Video adicionado com sucesso', videoUrl});
  } catch (err) {
    reply.code(500).send({error: 'Erro ao adicionar o video'})
  }
  console.log(database.list())

return

});

server.get('/videos', () => {
  const videos = database.list()
  console.log(videos)
  return videos
})

server.put('/videos/:id', (request, reply) => {
  const videoId = request.params.id
  const { name, videoUrl, duration } = request.body

  database.update(videoId, {
    name: name,
    videoUrl: videoUrl,
    duration: duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', () => {
  return 'deletado'
})


server.listen({
  port: 3333,

})