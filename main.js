import express from 'express';
import { generate } from 'promptparse/dist/generators/TrueMoney.js'
import cors from 'cors'
import conn from './conn.js'

const app = express()

app.use(express.json())
app.use(cors())

app.post('/gener/', (req, res)=>{
    const text = String(req.body.text)
    const amount = Number(req.body.amount)

    const payLoad = generate('0994475548', amount, text)

    res.send({
        amount: String(amount),
        text: text,
        payLoad: payLoad
    })
})

app.post('/user/check', (req, res)=>{
    const ref = req.body.ref;
    const time = req.body.time;
    var sql = `INSERT INTO "payment" (ref, time) values ('${ref}', '${time}')`

    conn.query(sql, (err, result, fields)=>{
        if(err)throw err;
        res.status(200).send({
            message: "Good..."
        })
    })
})

app.listen(3000, ()=>{
    console.log("Listin");
})
