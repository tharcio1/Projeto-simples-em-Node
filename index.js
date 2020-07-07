const express = require('express');

const server = express();

server.use(express.json());

server.listen(3000);

const projects = [];

var cont = 0;

server.use((req,res,next) =>{
  cont++;
  console.log(cont);

  return next();
});

function verifyProject(req,res,next){
  if(!projects[req.params.id]){
    return res.status(400).json({ error: "Project not found!" });
  }

  return next();
}

function verifyID(req,res,next){
  if(!req.body.id){
    return res.status(400).json({ error: "ID not inserted!"} );
  }

  return next();
}


server.get('/projects', (req,res) => {
  return res.json(projects);
});

server.post('/projects', verifyID, (req,res) =>{
  const {id, title, tasks} = req.body;

  const newProject = {id,title,tasks};

  projects.push(newProject);

  return res.json(projects);
});

server.post('/projects/:id/tasks', verifyProject, (req,res) => {
  const {id} = req.params;
  const {title} = req.body;

  projects[id].tasks.push(title);

  return res.json(projects[id]);
});

server.put('/projects/:id', verifyProject, (req,res) => {
  const {id} = req.params;
  const {title} = req.body;

  projects[id].title = title;

  return res.json(projects[id]);
});

server.delete('/projects/:id', verifyProject, (req,res) => {
  const{id} = req.params;

  projects.splice(id,1)

  return res.send();
});