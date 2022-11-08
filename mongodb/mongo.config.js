const { MongoClient } = require("mongodb");
const connectionString = 'mongodb+srv://Register-Login:7fwZrYeq7M0ABIGM@cluster0.gir75fo.mongodb.net/?retryWrites=true&w=majority';;
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const dbCollectionList = ['UserTable'];
let dbConnection;

module.exports = {
    connectToServer: function async() {
        return new Promise((resolve) => {
            client.connect(async function (err, db) {
                if (err || !db) {
                    resolve(err);
                }
                dbConnection = db.db("Register-Login");
                const collectionList = await dbConnection.collections();
                dbCollectionList.forEach((dbTable) => {
                    const isExistTable = collectionList.findIndex((collection) => collection.collectionName == dbTable);
                    if (isExistTable === -1) {
                        dbConnection.createCollection(dbTable);
                    }
                });
                resolve('MongoDb Connection Successfully done');
            });
        })
    },

    getDb: function () {
        return dbConnection;
    },
};