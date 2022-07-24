const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const { getSystemErrorMap } = require('util');
const app = express();
const port = process.env.PORT || 80;

app.use(express.urlencoded({extended : true}));  
app.use(express.json());

const url = "mongodb+srv://connor:OOADProject6359@expertsearch.vx8cj.mongodb.net/webengine?retryWrites=true&w=majority";
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
//mongoose.set('debug', true);
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
let seSchema= new mongoose.Schema({ websiteurl: { type: String, required: true }, title: {type: String, required: true},description: { type: String, required: true}, name: { type: String, required: true } ,numAccessed: { type: Number, required: true }, sponserPayment: { type: Number, required: true}, dateCreated:{ type: Date, required: true}},{ strict: false },{collection : 'websites'});
var Websites = mongoose.model('Websites',seSchema);

const staticPath = path.join(__dirname, "public")
app.use("/public", express.static(staticPath))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/templates/index.html'))
})
app.get('/search',(req,res) => {
    res.sendFile(path.join(__dirname,'/templates/search.html'))
})
app.get('/getcount', async (req,res)=>{
  
   
    let query =  req.query.query; 
    let typeSearch = req.query.type;
    let orderSearch = req.query.order;
    let numOfResultsPerPage = req.query.resultsperPage;
    
    
    if(typeSearch == "AND")      // AND
    {
         if(orderSearch == "ALPHABETICAL")
         {
             let totalCount = await Websites.find({$or: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).countDocuments();
             let totalNumberOfPages = Math.floor(totalCount / numOfResultsPerPage) + 1;
             res.send({pageCount: totalNumberOfPages});
         }
         else if(orderSearch == "FREQUENTLYACCESSED")
         {
             
             let totalCount = await Websites.find({$or: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).sort({numAccessed: -1}).countDocuments();
             let totalNumberOfPages = Math.floor(totalCount / numOfResultsPerPage) + 1;
             res.send({pageCount: totalNumberOfPages});
         }
         else
         {
             let totalCount = await Websites.find({$or: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).sort({sponserPayment: -1}).countDocuments();
             let totalNumberOfPages = Math.floor(totalCount / numOfResultsPerPage) + 1;
             res.send({pageCount: totalNumberOfPages});
         }        
    }
    else if (typeSearch == "OR")     // OR           
    {
         let queryArray = query.split(" ");          
         let allqueries = queryArray.join("|");      // Found method googling MongoDB query $in with regex array of element
         
         if(orderSearch == "ALPHABETICAL")
         {
             let totalCount = await Websites.find({$or: [{'websiteurl': {"$regex": allqueries}}, {'description': {"$regex": allqueries}}]}).sort({name: 'asc'}).countDocuments();
             let totalNumberOfPages = Math.floor(totalCount / numOfResultsPerPage) + 1;
             res.send({pageCount: totalNumberOfPages});
             
         }
         else if(orderSearch == "FREQUENTLYACCESSED")
         {
             let totalCount = await Websites.find({$or: [{'websiteurl': {"$regex": allqueries}}, {'description': {"$regex": allqueries}}]}).sort({numAccessed: -1}).countDocuments();
             let totalNumberOfPages = Math.floor(totalCount / numOfResultsPerPage) + 1;
             res.send({pageCount: totalNumberOfPages});
         }
         else
         {
             let totalCount = await Websites.find({$or: [{'websiteurl': {"$regex": allqueries}}, {'description': {"$regex": allqueries}}]}).sort({sponserPayment: -1}).countDocuments();
             let totalNumberOfPages = Math.floor(totalCount / numOfResultsPerPage) + 1;
             res.send({pageCount: totalNumberOfPages});
         }    
    }
    else                            // NOT
    {
        if(orderSearch == "ALPHABETICAL")
         {
             let totalCount = await Websites.find({$nor: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).countDocuments();
             let totalNumberOfPages = Math.floor(totalCount / numOfResultsPerPage) + 1;
             res.send({pageCount: totalNumberOfPages});
         }
         else if(orderSearch == "FREQUENTLYACCESSED")
         {
             let totalCount = await Websites.find({$nor: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).countDocuments();
             let totalNumberOfPages = Math.floor(totalCount / numOfResultsPerPage) + 1;
             res.send({pageCount: totalNumberOfPages});
         }
         else
         {
             let totalCount = await Websites.find({$nor: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).countDocuments();
             let totalNumberOfPages = Math.floor(totalCount / numOfResultsPerPage) + 1;
             res.send({pageCount: totalNumberOfPages});
         }    
    }
    
    
 })
app.get('/getdata', async (req,res)=>{
  
   
   let query =  req.query.query; 
   let typeSearch = req.query.type;
   let orderSearch = req.query.order;
   let numOfResultsPerPage = req.query.resultsperPage;
   let pageNumber = req.query.pageNumber;
   
   if(typeSearch == "AND")      // AND
   {
        if(orderSearch == "ALPHABETICAL")
        {
            
            let results= await Websites.find({$or: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).limit(numOfResultsPerPage).skip((pageNumber - 1) * numOfResultsPerPage).sort({name: 'asc'});
            res.send({data: results});
        }
        else if(orderSearch == "FREQUENTLYACCESSED")
        {            
            let results= await Websites.find({$or: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).limit(numOfResultsPerPage).skip((pageNumber - 1) * numOfResultsPerPage).sort({numAccessed: -1});
            res.send({data: results});
        }
        else
        {
           
            let results= await Websites.find({$or: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).limit(numOfResultsPerPage).skip((pageNumber - 1) * numOfResultsPerPage).sort({sponserPayment: -1});
            res.send({data: results});
        }        
   }
   else if (typeSearch == "OR")     // OR           
   {
        let queryArray = query.split(" ");          
        let allqueries = queryArray.join("|");      // Found method googling MongoDB query $in with regex array of element
        
        if(orderSearch == "ALPHABETICAL")
        {
            let results= await Websites.find({$or: [{'websiteurl': {"$regex": allqueries}}, {'description': {"$regex": allqueries}}]}).limit(numOfResultsPerPage).skip((pageNumber - 1) * numOfResultsPerPage).sort({name: 'asc'});
            res.send({data: results});
            
        }
        else if(orderSearch == "FREQUENTLYACCESSED")
        {
            
            let results= await Websites.find({$or: [{'websiteurl': {"$regex": allqueries}}, {'description': {"$regex": allqueries}}]}).limit(numOfResultsPerPage).skip((pageNumber - 1) * numOfResultsPerPage).sort({numAccessed: -1});
            res.send({data: results});
        }
        else
        {
            let results= await Websites.find({$or: [{'websiteurl': {"$regex": allqueries}}, {'description': {"$regex": allqueries}}]}).limit(numOfResultsPerPage).skip((pageNumber - 1) * numOfResultsPerPage).sort({sponserPayment: -1});
            res.send({data: results});
        }    
   }
   else                            // NOT
   {
       if(orderSearch == "ALPHABETICAL")
        {
            let results = await Websites.find({$nor: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).limit(numOfResultsPerPage).skip((pageNumber - 1) * numOfResultsPerPage).sort({name: 'asc'});
            res.send({data: results});
        }
        else if(orderSearch == "FREQUENTLYACCESSED")
        {
            let results = await Websites.find({$nor: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).limit(numOfResultsPerPage).skip((pageNumber - 1) * numOfResultsPerPage).sort({numAccessed: -1});
            res.send({data: results});
        }
        else
        {
            let results = await Websites.find({$nor: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}).limit(numOfResultsPerPage).skip((pageNumber - 1) * numOfResultsPerPage).sort({sponserPayment: -1});
            res.send({data: results});
        }    
   }
   
   
})
app.post('/update',async (req,res) =>{

    
    console.log(req.body.updateurl);
    let url = req.body.updateurl;
  
    Websites.findOneAndUpdate({websiteurl: url}, {$inc : {'numAccessed': 1}}, null,function(err, doc) {  if (err) return res.send(500, {error: err}); return res.send('Succesfully saved.');
    });
    
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    //let query = "amc";
    //var q = Websites.find({$or: [{'websiteurl': {"$regex": query}}, {'description': {"$regex": query}}]}, function(err, doc){ console.log((doc)) })
    
    }
  )