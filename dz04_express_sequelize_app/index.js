import {env} from "node:process";
import express from 'express';
import bodyParser from "body-parser";
import DbService from "./db_servise.js";

const db = new DbService();
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = env.NODEAPP_PORT || 3000;
const apiPath = env.API_PATH;

app.get(apiPath, async (req, res)=>{
    try{
        const contacts = await db.getAll();
        console.log(contacts)
        res.send(contacts);
    } catch (e){
        res.status(500);
        res.send(e);
    }
});
app.get(`${apiPath}/:id`, async (req, res)=>{
    const id = Number(req.params.id);
    try{
        const contact = await db.getOne(id);
        console.log(contact)
        res.send(contact);

    } catch (e){
        res.status(500);
        res.send(e);
    }
});
app.delete(`${apiPath}/:id`, async (req, res)=>{
    const id = Number(req.params.id);
    try{
        await db.delete(id);
        res.status(204);
        res.send('Объект удален, наверно...')
    } catch (e){
        res.status(500);
        res.send(e);
    }
});
app.patch(`${apiPath}/:id`, async (req, res)=>{
    const id = Number(req.params.id);
    const data = req.body;
    try{
        await db.update(id, data);
        res.status(200);
        res.send("Объект изменен")
    } catch (e){
        res.status(500);
        res.send(e);
    }
});
app.post(apiPath, async (req, res)=>{
    const data = req.body;
    console.log(data);
    try{
        const createdItem = await db.create(data);
        res.status(201);
        res.send(createdItem);
    } catch (e){
        res.status(500);
        res.send(e);
    }
});


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})