const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const routes = require('./routes')

const app = express()

const PORT = config.get('port') || 5000

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))



app.use(express.json({ extended: true }))

routes.forEach(route =>{
  app.use('/api', require(`./routes/${route}`))
})

async function start(){
  try {
    await mongoose.connect(config.get('mongoUrl'),{
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    })
    app.listen(PORT, () => console.log(`Server started on ${PORT}`))
  } catch (e) {
    console.log('Server error', e)
    process.exit(1)
  }
}

start()


if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}