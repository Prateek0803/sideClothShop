const express       = require('express')
const bodyParser    = require('body-parser')
const dotenv        = require('dotenv')
const userRoute     = require('./routes/user')
const authRoute     = require('./routes/auth')
const prodRoute     = require('./routes/product')
const orderRoute    = require('./routes/order')
const cartRoute     = require('./routes/cart')
const connection    = require('./db/db')


const app           = express()



dotenv.config()
connection()

app.use(express.json())        
app.use('/api/auth',    authRoute)
app.use('/api/user',    userRoute)
app.use('/api/product', prodRoute)
app.use('/api/cart',    prodRoute)
app.use('/api/order',   prodRoute)

app.listen(process.env.PORT || 5000 , () => {
    console.log(`Server is connected at ${process.env.PORT ? process.env.PORT : 5000}`)
})


