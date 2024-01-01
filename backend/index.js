const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const  userRoutes =require('./routes/userRoutes');
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path= require('path')

const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running");
});
// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });
// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);

  
//   res.send(note);
// });

//exported from routes imported here
app.use('/api/users',userRoutes)
app.use('/api/notes',noteRoutes);
// })
app.use(notFound);
app.use(errorHandler);
//----------------deployment--------
// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname1,"/frontend/build")))
//     //establishing path from current working directory to build folder

//     app.get('*',(req,res)=>{
//       //get content in index.html of build
//       res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
//     })
// }else{
//   app.get("/", (req, res) => {
//     res.send("API is running");
//   });
// }
//----------------deployment--------
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started at ${PORT} `));
