import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import post from "./routers/posts.js";
import mongoose from "mongoose";


const app = express();
const PORT = process.env.port || 5000;
const URI = 'mongodb+srv://admin:NwDpWtA8h7d0GpMH@cluster1.yp9solp.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log('Server is running on port', PORT);
        });
    })
    .catch((err) => {
        console.log('ERR', err);
    })
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb' }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('SUCCESS');
    console.log('SUCCESS');
})
app.use('/posts', post)


