import express from 'express';
import {Sequelize} from "sequelize";
import {env} from 'node:process';
import bodyParser from "body-parser";

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = env.PORT || 3000;
const apiPath = env.API_PATH;
const db = env.NODEAPP_DB || 'db';
const dbUser = env.NODEAPP_USER|| 'user';
const dbPass = env.NODEAPP_PASS || 'user';
const dbHost = env.NODEAPP_HOST || 'localhost';
const dbDialect = env.NODEAPP_DIALECT || 'mariadb';

const sequelize = new Sequelize(
    db,
    dbUser,
    dbPass,
    {
        host: dbHost,
        dialect: dbDialect
    });
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.get(apiPath, async (req, res) => {
        const contacts = await getDataFromDB();
        res.status(200)
        res.send(contacts[0]);
    });

    app.get(`${apiPath}/:id`, async (req, res) => {
        console.log(req.params.id);
        const id = Number(req.params.id);
        if(!id) {
            res.status(500);
            res.send({error: 'Error 500'})
        } else {
            try{
               const item = await getById(id);
                res.status(200);
                res.send(item[0]);
            } catch(e){
                res.status(500);
                res.send({error: `Неизведанная ошибка ${e}`})
            }
        }
    })

    app.delete(`${apiPath}/:id`, async (req, res) => {
        console.log(req.params.id);
        const id = Number(req.params.id);
        if(!id) {
            res.status(500);
            res.send({error: 'Error 500'})
        } else {
            try{
                const item = await deleteById(id);
                res.status(200);
                res.send('the contact has been deleted');
            } catch(e){
                res.status(500);
                res.send({error: `Неизведанная ошибка ${e}`})
            }
        }
    })
    app.patch(`${apiPath}/:id`, async (req, res) => {
        console.log(req.params.id);
        const id = Number(req.params.id);
        const data = req.body;
        if(!id) {
            res.status(500);
            res.send({error: 'Error 500'})
        } else {
            try{
                const item = await patchContact(id, data);
                res.status(200);
                res.send('Контакт был изменен вроде...');
            } catch(e){
                res.status(500);
                res.send({error: `Неизведанная ошибка ${e}`})
            }
        }
    })


    app.post(apiPath, async(req,res)=> {
        const data = req.body;
        try{
            await insertDataToDB(data);
            res.status(200);
            console.log('Телефон добавлен в БД');
            res.send( `ок`)
        } catch(e){
            res.status(500);
            res.send({error: `Неизведанная ошибка ${e}`})
        }
        console.log(data);
    })




} catch (error) {
    console.error('Unable to connect to the database:', error);
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



async function getDataFromDB() {
    try {
        return await sequelize.query('SELECT * FROM `contacts`');
    } catch (e){
        console.error('ERROR SQL QUERY:', e);
        return false;
    }
}
async function getById(id) {
    try {
        return await sequelize.query(`SELECT * FROM \`contacts\` WHERE \`id\` = ${id}`);
    } catch (e){
        console.error('ERROR SQL QUERY:', e);
        return false;
    }
}

async function deleteById(id){
    try {
        return await sequelize.query(`DELETE FROM \`contacts\` WHERE \`id\` = ${id}`);
    } catch (e){
        console.error('ERROR SQL QUERY:', e);
        return false;
    }
}
async function patchContact(id, data){
    try {
        return await sequelize.query(`UPDATE \`contacts\` SET \`name\` = '${data.name}', \`phone\` = '${data.phone}' WHERE \`contacts\`.\`id\` = ${id}; `);
    } catch (e){
        console.error('ERROR SQL QUERY:', e);
        return false;
    }
}
async function insertDataToDB(data) {
    try {
        return await sequelize.query(`INSERT INTO \`contacts\` (\`name\`, \`phone\`) VALUES ('${data.name}', '${data.phone}');`);
    } catch (e){
        console.error('ERROR SQL QUERY:', e);
        return false;
    }
}