// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

// Event handler for post creation
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    // Filter comment content for the word 'orange'
    const status = content.includes('orange') ? 'rejected' : 'approved';

    // Send event to event bus
    await axios.post('http://event-bus-clusterip-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});