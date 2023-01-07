import fetch from "node-fetch";
import express from 'express';
import request from 'request';
import { load } from "cheerio";

const app = express();

app.use(express.json())

app.post('/', async (req, res, next) => {
    try {

        const {url, selector} = req.body;
        console.log(url, selector)
        const page = await fetch(url)
        let $ = load(await page.text())
        let data = $(selector)
        res.send({
            data: data.text()
        })
    } catch (e) {
        console.log(e)
        res.send({
            msg: 'sorry. ive failed you :('
        })
    }
})

app.listen('9991', () => {
    console.log('server at 9991')
})