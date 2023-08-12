import express from 'express';
import { generate } from 'promptparse/dist/generators/TrueMoney.js'
import cors from 'cors'
import conn from './conn.js'
import twApi from '@opecgame/twapi'

const app = express()

app.use(express.json())
app.use(cors())

async function getWallet(code) {
    var resp
    const tw = await twApi(code, '0994475548')
    switch (tw.status.code) {
        case "SUCCESS":
            resp = {
                status: 200,
                message: tw.status.message,
                messageCode: tw.status.code,
                amount: tw.data.voucher.amount_baht
            }
            return resp
        case "CANNOT_GET_OWN_VOUCHER":
            resp = {
                status: 400,
                message: tw.status.message,
                messageCode: tw.status.code,
                // amount: tw.data.voucher.amount_baht
            }
            return resp
        case "TARGET_USER_NOT_FOUND":
            resp = {
                status: 400,
                message: tw.status.message,
                messageCode: tw.status.code,
                // amount: tw.data.voucher.amount_baht
            }
            return resp
        case "INTERNAL_ERROR":
            resp = {
                status: 400,
                message: tw.status.message,
                messageCode: tw.status.code,
                // amount: tw.data.voucher.amount_baht
            }
            return resp
        case "VOUCHER_OUT_OF_STOCK":
            resp = {
                status: 400,
                message: tw.status.message,
                messageCode: tw.status.code,
                amount: tw.data.voucher.amount_baht
            }
            return resp
        case "VOUCHER_NOT_FOUND":
            resp = {
                status: 400,
                message: tw.status.message,
                messageCode: tw.status.code,
                // amount: tw.data.voucher.amount_baht
            }
            return resp
        case "VOUCHER_EXPIRED":
            resp = {
                status: 400,
                message: tw.status.message,
                messageCode: tw.status.code,
                amount: tw.data.voucher.amount_baht
            }
            return resp
        default:
            break;
    }
}

app.post('/gener/', (req, res) => {
    const text = String(req.body.text)
    const amount = Number(req.body.amount)

    const payLoad = generate('0994475548', amount, text)

    res.send({
        amount: String(amount),
        text: text,
        payLoad: payLoad
    })
})

app.post('/user/check', (req, res) => {
    const ref = req.body.ref;
    const time = req.body.time;
    var sql = `INSERT INTO "payment" (ref, time) values ('${ref}', '${time}')`

    conn.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.status(200).send({
            message: "Good😁"
        })
    })
})

app.post('/aungpao', async (req, res) => {
    const url = req.body.url;

    const term = await getWallet(url)
    res.status(term.status).send(term)
    // console.log(term);
})

app.listen(3000, () => {
    console.log("Listin");
})