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
app.use(express.urlencoded());


// get method for loading all data from employee_data
app.get('/contact',async(req,res)=>{
    const employeeDatas = await db('data_pegawai').select('*').orderBy('id','asc');
    const employeesData = JSON.stringify(employeeDatas);
    const employeeData = JSON.parse(employeesData);


    res.render('index',{
        layout : './layouts/main-layout',
        title : 'Data Pegawai',
        employeeData
    })

})

// add new data handle
app.get('/contact/add',async(req,res)=>{
    
    res.render('addData',{
        title : 'Add New Employee Data',
        layout : './layouts/main-layout'
    })
})
app.post('/contact',async(req,res)=>{
    const {nama_pegawai,job_level,tanggal_lahir} = req.body;
    const employeeData =  await db('data_pegawai').insert({
        nama_pegawai : nama_pegawai,
        job_level : job_level,
        tanggal_lahir : tanggal_lahir,
    }).returning(['id']);
    res.redirect('/contact')
})

// detail page of Employee Data
app.get('/contact/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const employeeDatas = await db('data_pegawai').select('*').where('id',id).first();
    const employeesData = JSON.stringify(employeeDatas);
    const employeeData = JSON.parse(employeesData);


    res.render('detail',{
        layout : './layouts/main-layout',
        title : `Data Pegawai : ${employeeData.nama_pegawai}`,
        employeeData
    })

})





app.use('/',async(req,res)=>{
    res.status = 404;
    res.send('404 Page Not Found')
})

// App Listening Port
app.listen(port,()=>{
    console.log(`App is listening to port ${port}`)
})
