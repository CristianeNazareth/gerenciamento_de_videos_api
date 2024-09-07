import { randomUUID } from "crypto";
// import { sql } from './db';


export class DatabasePostgres {
  async list(seach) {
    let videos

    if (seach) {
      videos = await sql`select * from videos where title ilike % seach% `
    } else {
      videos = await sql`select * from videos`
    }
    return videos
  }
// }


// post
  async create(video) {
    const videoId = randomUUID();
    const { title, url, duration } = video;

    await sql
    `insert into videos( id, title, url, duration) VALUES ( ${videoId}, ${title}, ${url}, ${duration})`
  console.log('Video criado');

}





}