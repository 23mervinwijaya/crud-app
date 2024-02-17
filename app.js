const express = require('express');
const app = express();
const port = 5432;

app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.send('<h1>Index Page</h1>')
});

app.listen(port,()=>{
    console.log(`App is listening to port ${port}`)
})
