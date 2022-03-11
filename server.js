
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');

const userRoute = require('./routes/user');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dotenv = require('dotenv');
const { collection } = require('./models/User');
dotenv.config({ path: './config/.env' })


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", function () {
    db.db.collection("users", function (err, data) {
        collection.find({}).toArray(function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log(data);
            }
        })
    })
})


app.use('/api', userRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('backend server is running');
})




