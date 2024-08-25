import express from 'express';
import bodyParser from 'body-parser'
import cors from "cors"
import axios from 'axios';


const app = express();
const port = 4005;


app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)
    axios.post('http://localhost:4003/events', event)

    res.status(201).send({status: "Ok"});
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
