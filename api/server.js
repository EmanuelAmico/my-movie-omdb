const express = require("express")
const volleyball = require("volleyball")
const db = require("./db")
const {red} = require("chalk")
const routes = require('./routes')

const app = express()

// Configs
app.use(volleyball)
app.use(express.json()) //Para los GET no hace falta pero para los POST sí :)

//Routes
app.use("/", routes)

// Error Middleware
app.use((error, req, res, next) =>{
  console.log(red("Ha ocurrido un error y entré al error middleware:"))
  console.log(error)
  res.sendStatus(500)
})

// Preguntar si esta forma de levantar el server con async/await está bien
const deployServer = async () =>{
  try{
    await db.sync({force: true})
    const port = 3001
    app.listen(port, () =>{
      console.log(`Server running on http://localhost/${port}`)
    })  
  }catch(error){
    console.log(red(error))
  }
}

deployServer()
