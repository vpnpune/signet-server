import { MongoClient,ObjectID } from 'mongodb';
import * as constants from './../constants'; // import constants

//const uri = `mongodb://localhost:${constants.MONGO_PORT}/${constants.DB_NAME}`;
const uri="mongodb+srv://m001-student:gC5hQRkRdMGSn8J9@cluster0-aknqy.mongodb.net/test?retryWrites=true";
let _db

const connectDB = async (callback) => {
    try {
        MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
            _db = db
            return callback(err)
        })
    } catch (e) {
        throw e
    }
}

const getDB = () => _db
const getObjectId = ObjectID;

const disconnectDB = () => _db.close()


export default { connectDB, getDB, disconnectDB,getObjectId };
