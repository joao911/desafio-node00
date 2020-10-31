const express = require("express");
const cors = require("cors");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body 

  const repository ={
    id: uuid(),
    title,
    url,
    techs,
    likes:0
  }

  if(!isUuid(repository.id)){
    return response.status(400).json({error: 'id invalido'})
  }
  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params

  const result = repositories.findIndex(repository => repository.id === id)

  if(result < 0){
    return response.status(400).json({error: 'id inválido'})
  }

  const {title, url, techs} = request.body

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[result].likes
  }

  repositories[result] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const result = repositories.findIndex(repository => repository.id === id)

  if(result < 0){
    return response.status(400).json({error: 'id inválido'})
  }

  repositories.splice(result,1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const result = repositories.findIndex(repository => repository.id === id)

  if(result < 0){
    return response.status(400).json({error: 'id inválido'})
  }

  repositories[result].likes++

  return response.json( repositories[result])
});

module.exports = app;
