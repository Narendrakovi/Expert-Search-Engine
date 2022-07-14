const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

const url = "mongodb+srv://connor:OOADProject6359@expertsearch.vx8cj.mongodb.net/webengine?retryWrites=true&w=majority";
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
const seSchema= new mongoose.Schema({ websiteurl: { type: String, required: true }, description: { type: String, required: true}},{collection : 'websites'});
var Websites = mongoose.model('Websites',seSchema);

const staticPath = path.join(__dirname, "public")
app.use("/public", express.static(staticPath))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/templates/index.html'))
})
app.get('/search',(req,res) => {
    res.sendFile(path.join(__dirname,'/templates/search.html'))
})
app.get('/getdata', async (req,res)=>{
  
   let query =  req.query.query;     
   var q = Websites.find({$or: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}, function(err, doc){ res.send(doc);})
   
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    //let query = "amc";
    //var q = Websites.find({$or: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}, function(err, doc){ console.log((doc)) })
    
    }
  )