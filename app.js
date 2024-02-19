// Import Requirement
const express = require("express");
const app = express();
const expresslayouts = require("express-ejs-layouts");
const morgan = require("morgan");

// Database Conn
const db = require("./db");

// port Initiate
const port = 3000;

// Middleware
app.set("view engine", "ejs");
app.use(expresslayouts);
app.use(express.static("Public"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(express.urlencoded());


// Index Page
app.get('/',(req,res)=>{
  res.render('index',{
    title : "CRUD Mini App",
    layout : "./layouts/main-layout",
  })
})

// get method for loading all data from employee_data
app.get("/contact", async (req, res) => {
  const employeeDatas = await db("data_pegawai")
    .select("*")
    .orderBy("id", "asc");
  const employeesData = JSON.stringify(employeeDatas);
  const employeeData = JSON.parse(employeesData);

  res.render("contact", {
    layout: "./layouts/main-layout",
    title: "Data Pegawai",
    employeeData,
  });
});

// add new data handle
app.get("/contact/add", async (req, res) => {
  res.render("addData", {
    title: "Add New Employee Data",
    layout: "./layouts/main-layout",
  });
});
app.post("/contact", async (req, res) => {
  const { nama_pegawai, job_level, tanggal_lahir } = req.body;
  const employeeData = await db("data_pegawai")
    .insert({
      nama_pegawai: nama_pegawai,
      job_level: job_level,
      tanggal_lahir: tanggal_lahir,
    })
    .returning(["id"]);
  res.redirect("/contact");
});


// detail page of Employee Data
app.get("/contact/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const employeeDatas = await db("data_pegawai")
    .select("*")
    .where("id", id)
    .first();
  const employeesData = JSON.stringify(employeeDatas);
  const employeeData = JSON.parse(employeesData);

  res.render("detail", {
    layout: "./layouts/main-layout",
    title: `Data Pegawai : ${employeeData.nama_pegawai}`,
    employeeData,
  });
});

// Edit Contact
// app.get("/contact/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const employeeDatas = await db("data_pegawai")
//     .select("*")
//     .where("id", id)
//     .first();
//   const employeesData = JSON.stringify(employeeDatas);
//   const employeeData = JSON.parse(employeesData);

//   res.render("edit-contact", {
//     layout: "./layouts/main-layout",
//     title: `Edit Data Pegawai : ${employeeData.nama_pegawai}`,
//     employeeData,
//   });
// });

// app.put("/contact/edit/:id", async (req, res) => {
//   const {id,nama_pegawai, job_level, tanggal_lahir } = req.body;
//   const employeeData = await db("data_pegawai")
//     .update({
//       nama_pegawai: nama_pegawai,
//       job_level: job_level,
//       tanggal_lahir: tanggal_lahir,
//     }).where('id',id);
//   res.redirect("/contact");
// });



app.use("/", async (req, res) => {
  res.statusCode = 404;
  
  
  res.render('404',{
    title : 'Page Not Found',
    layout : 'layouts/main-layout'
  });
  });

// App Listening Port
app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
