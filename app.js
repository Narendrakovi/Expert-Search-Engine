const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const staticPath = path.join(__dirname, "public")
app.use("/public", express.static(staticPath))

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/templates/index.html'))
})
app.get('/search',(req,res) => {
    res.sendFile(path.join(__dirname,'/templates/search.html'))
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })