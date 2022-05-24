const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;      
app.use(cors());               
app.use(express.json()); 






const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.axy7a.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        await client.connect();
        console.log('db connected');

        const database= client.db('college');
        const studentCollection = database.collection('students');

        app.get('/students', async (req,res)=>{
            const cursor = await studentCollection.find({});
            const students = await cursor.toArray()
            res.send(students);
        });

        app.post('/students', async (req,res)=>{
            const student = req.body;
            const result = await studentCollection.insertOne(student);
            res.json(result);
        })
        app.get('/students/:id', async (req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await studentCollection.findOne(query);
            res.json(result);
        })

    }
    finally{
        // await client.close()
    
      }
}
run().catch(console.dir);













app.get('/', (req, res) => {
    res.send('DB')
  })
  
  app.listen(port, () => {
    console.log(` listening at ${port}`)
  })