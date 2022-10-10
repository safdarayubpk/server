import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { stringify } from 'querystring'
let app = express()
let port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())


let dbschema = new mongoose.Schema({
   
    text : {type: String , required: true},
    date : { type: Date, default: Date.now }
    
  });

  // Mongos model
  let  dbmodel = mongoose.model('todoapps', dbschema);

  // save Data db (server api)

  app.post('/todo', (req, res) => {
    dbmodel.create({text: req.body.text}, (err, save) => {
        if(!err) { 
            res.send({
                message: "data saved",
                data : save
            })
        } else{
            res.status(500).send({
                message: "server error"
            })
        }
    })
  })

  app.get('/todo', (req, res) => {
    dbmodel.find({}, (err, data) => {
        if(!err){
            res.send({
                message : "Data found",
                data : data
            })
        }else{
            res.status(500).send({
                message: "server error"
            })
        }
    }) 
  })


app.listen(port, () => {
    console.log(`port is log in${port}`)
})

//////////////////////////////////MONDODB EVENT///////////////////////////////////////////////////////////////
let DbLink = "mongodb+srv://safdarayub:bbcurdu2@cluster0.danfmmc.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DbLink);
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});
mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});
process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
