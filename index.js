const express = require('express');

// require file to search the database
const db = require('./data/hubs-model.js');

const server = express();

// gets executed before it executes the post handler and every request
// modifies the body such that it can be used by Express
// otherwise it will give database errors 
server.use(express.json());

// route handler
server.get('/', (request, response) => {
  response.send('Hello world from Express!');
})

date = new Date(Date.now())

server.get('/now', (request, response) => {
  const now = new Date().toISOString(); // 2019-07-24T02:44:24.838Z
  response.send(now);
})

server.get('/hubs', (request, response) => {
  db.find()  
    .then(hubs => {
      response.status(200).json(hubs);
    })
    .catch(err => {
      response.status(500).json({success: false, err});
    })
})

server.post('/hubs', (request, response) => {
  // POST /hubs {name: somename}
  const hubInfo = request.body;
  console.log(hubInfo);

  db.add(hubInfo) 
    .then(hub => {
      response.status(201).json({success: true, hub}); // 201 response code
    })
    .catch(err => {
      response.status(500).json({success: false, err})
    })
})

server.put('/hubs/:id', (request, response) => {
  const { id } = request.params;
  const hubInfo = request.body;
  console.log(hubInfo);

  db.update(id, hubInfo)
    .then(updated => {
      if (updated) {
        response.status(200).json({success: true, updated});
      } else {
        response.status(404).json({success: false, message: 'I cannot find the hub you are looking for'})
      }
    })
    .catch(err => {
      response.status(500).json({success: false, err});
    })
})

server.delete('/hubs/:id', (request, response) => {
  // DELETE /hubs/:id
  const {id} = request.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        response.status(204).end();
      } else {
        response.status(404).json({success: false, message: 'I cannot find the hub you are looking for'});
      }
    })
    .catch(err => {
      response.status(500).json({success: false, err});
    })
})

// TODO specify ID and return one hub



server.listen(4000, () => {
  console.log('Server listening on port 4000');
}); // port number

