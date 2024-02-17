// Import Requirement
const express = require('express');
const app = express();
const expresslayouts = require('express-ejs-layouts');
const morgan = require('morgan');

// Database Conn
const db = require('./db')

// port Initiate
const port = 3000;

// Middleware
app.set('view engine','ejs');
app.use(expresslayouts);
app.use(express.static('Public'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());


// get data from database
app.get('/',async(req,res)=>{
    const employeeDatas = await db('data_pegawai').select('*').orderBy('id','asc');
    const employeesData = JSON.stringify(employeeDatas);
    const employeeData = JSON.parse(employeesData);
    res.render('index',{
        layout : './layouts/main-layout',
        title : 'Data Pegawai',
        employeeData,
    })

})


app.use('/',(req,res)=>{
    res.status = 404;
    res.send('404 Page Not Found')
})

// App Listening Port
app.listen(port,()=>{
    console.log(`App is listening to port ${port}`)
})
