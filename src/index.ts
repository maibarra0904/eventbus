import express from 'express';
import bodyParser from 'body-parser'
import cors from "cors"
import axios from 'axios';


const app = express();
const port = 4005;


app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

const events = []
app.post('/events', async(req, res) => {
    const event = req.body;

    events.push(event)

    await axios.post('http://posts-clusterip-srv:4000/events', event)
    await axios.post('http://comments-srv:4001/events', event)
    try {
      //await axios.post('http://query-srv:4002/events', event)  
    } catch (error) {
      console.log(error)
    }
    
    //await axios.post('http://moderation-srv:4003/events', event)

    res.status(201).send({status: "Ok"});
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
