const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())



// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser : true,
    useUnifiedTopology : false,
})
.then(()=> console.log('Database connection established'))
.catch(err => console.log(err))


//import routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);


//default error handler

// const errorHandler = (err, req, res, next) => {
//     if(res.headersSent){
//         return next(err)
//     }
//     res.status(500).json({ error:err })
// }

// app.use(errorHandler)





const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})