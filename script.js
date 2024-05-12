import { METHODS } from "http";
import { json } from "stream/consumers";

document.getElementById('addVideo').addEventListener('submit', async (e) => {
  e.preventDefault();

  const videoUrl = document.querySelector('.videoUrl');
  // const videoUrl = document.('videoUrl').value;

  try {
    const response = await fetch('/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ videoUrl })
    });
    const data = await response.json();
    console.log(data.message)
  } catch (err) {
    console.error('Erro ao adicionar o video:', err)
  }
});


