import express from "express"
import mongoose from "mongoose"




const app = express()
const port = process.env.PORT || 9000;

const connection_url = 'mongodb+srv://admin:admin@cluster0.vsk0h.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect('')


app.get('/', (req, res) => res.status(200).send('hello world'));

app.listen(port, () => console.log(`Listen on LocalHost:${port}`));