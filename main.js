import express from 'express';
import { generate } from 'promptparse/dist/generators/TrueMoney.js'
import cors from 'cors'

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

app.listen(3000, ()=>{
    console.log("Listin");
})
