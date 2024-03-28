import {DataTypes, Sequelize} from "sequelize";
import process, {env} from "node:process";

const db = env.NODEAPP_DB || 'db';
const dbUser = env.NODEAPP_USER || 'user1';
const dbPass = env.NODEAPP_PASS || 'pass1';
const dbHost = env.NODEAPP_HOST || 'localhost';
const dbPort = env.NODEAPP_DB_PORT;
const dbDialect = env.NODEAPP_DIALECT || 'mysql'; // 'postgres'

export default class DbService {
    sequelize = new Sequelize(
        db,
        dbUser,
        dbPass,
        {
            host: dbHost,
            dialect: dbDialect,
            port: dbPort
        }
    );
    Contacts = this.sequelize.define('Contacts', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true
    })
    constructor() {
        process.on( "SIGINT", async ()=>{
            try{
                await this.sequelize.close();
                console.log("Disconnect from DB Success");
                process.exit(0);
            } catch (e){
                console.log('Disconnect from DB Error', e);
                process.exit(1);
            }
        });

        this.sequelize.authenticate().then(async () => {
            console.log('Connection has been established successfully.');
            await this.sequelize.sync();
        }).catch((error) => {
            console.error('Unable to connect to the database:', error);
        })
    }

    async getAll(){
        return await this.Contacts.findAll();
    }
    async getOne(id){
        return await this.Contacts.findOne({where: {id}});
        }
    async delete(id){
        return await this.Contacts.destroy({where: {id}});
        }
    async update(id, data){
        return await this.Contacts.update(data, {where: {id}});
        }
    async create(data){
        return await this.Contacts.create({name: data.name, phone: data.phone});
        }

}