import express from "express"
import mongoose from "mongoose"
import Messages from "./dbMessages.js"
import Pusher from 'pusher'


const app = express()
const port = process.env.PORT || 9000;


const pusher = new Pusher({
    appId: "1110472",
    key: "d45741b1df1b18ebfa8c",
    secret: "2cf3acf93e2ceeedcd24",
    cluster: "ap2",
    useTLS: true
});


app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})

const connection_url = 'mongodb+srv://admin:admin@cluster0.vsk0h.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useCreateIndex: true,
    userNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open', () => {
    console.log("DB Connection")

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change) => {
        console.log(change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message
                })
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.listen(port, () => console.log(`Listen on LocalHost:${port}`));