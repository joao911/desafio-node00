const express = require("express");
const cors = require("cors");

const { v4: uuidv4} = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body 

  const repo ={id: uuidv4(), title, url, techs, likes:0}

  repositories.push(repo)

  return response.status(201).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if(result < 0){
    return response.status(400).json({error: 'id inválido'})
  }

  const {title, url, techs} = request.body

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = repository

  return response.status(201).json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if(repoIndex < 0){
    return response.status(400).json({error: 'id inválido'})
  }

  repositories.splice(repoIndex,1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repoIndex = repositories.findIndex(repo => repo.id == id);

  if(repoIndex < 0) {
    return response.status(400).json({
      error: 'Repository not found to like'
    });
  }

  repositories[repoIndex].likes += 1;

  return response.status(200).json({ likes: repositories[repoIndex].likes });
});

module.exports = app;
